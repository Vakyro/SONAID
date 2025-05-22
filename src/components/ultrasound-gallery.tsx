"use client"

import Image from "next/image" // Keep Image if used by other parts, or remove if not.
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" // Keep if Card is used, or remove.
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Expand, Trash2 } from "lucide-react"
import { ImageValidator } from "@/components/image-validator"
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Asegúrate que estas importaciones estén presentes

declare global {
  interface Window {
    ort: any;
  }
}

// breastImages can be removed if not used elsewhere in this component for the gallery functionality
const breastImages = [
  {
    id: "1",
    title: "Ultrasonido de Mama Derecha",
    date: "14 de abril, 2025",
    description: "Vista transversal de masa en mama derecha",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: "Ultrasonido de Mama Izquierda",
    date: "14 de abril, 2025",
    description: "Vista longitudinal de mama izquierda",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: "Mamografía - Vista CC Derecha",
    date: "10 de abril, 2025",
    description: "Vista craneocaudal de mama derecha",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

// REMOVE THE DUPLICATE IMPORT BELOW
// import { useRouter } from 'next/navigation'; // Import useRouter 

export function UltrasoundGallery() {
  const [selectedImage, setSelectedImage] = useState<any>(null) // Puedes mantener esto si lo usas para otros propósitos
  const [validatedImage, setValidatedImage] = useState<File | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleValidImage = (file: File) => {
    console.log("handleValidImage called with file:", file);
    if (file) {
      setValidatedImage(file);
      // REMOVED: imageSrcForPreview logic
    } else {
      console.error("handleValidImage called with no file or invalid file");
      setValidatedImage(null);
      // REMOVED: imageSrcForPreview logic
    }
    setPrediction(null); // Resetea la predicción anterior al validar una nueva imagen
    setLoading(false);
    console.log("handleValidImage finished. validatedImage (argument):", file, "current loading state:", false);
  };

  const loadOrt = () =>
    new Promise<typeof window.ort>((resolve, reject) => {
      console.log("loadOrt called. Checking if window.ort exists:", window.ort);
      if (window.ort) return resolve(window.ort);
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js";
      script.onload = () => {
        console.log("ONNX runtime script loaded successfully.");
        resolve(window.ort);
      };
      script.onerror = (err) => {
        console.error("Failed to load ONNX runtime script:", err);
        reject(err);
      };
      document.body.appendChild(script);
    });

  const preprocessImage = (img: HTMLImageElement): Float32Array => {
    console.log("preprocessImage called for image:", img.src);
    const canvas = document.createElement("canvas");
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas 2D context.");
      throw new Error("No se pudo obtener el contexto del canvas");
    }
    ctx.drawImage(img, 0, 0, 224, 224);
    const imageData = ctx.getImageData(0, 0, 224, 224);
    const { data } = imageData;
    const floatData = new Float32Array(224 * 224 * 3);
    for (let i = 0; i < 224 * 224; i++) {
      floatData[i * 3 + 0] = data[i * 4 + 0] / 255; // R
      floatData[i * 3 + 1] = data[i * 4 + 1] / 255; // G
      floatData[i * 3 + 2] = data[i * 4 + 2] / 255; // B
    }
    console.log("preprocessImage finished successfully.");
    return floatData;
  };

  const predictWithModel = async (imageFile: File) => {
    console.log("predictWithModel called with imageFile:", imageFile?.name);
    if (!imageFile) {
      console.error("predictWithModel: imageFile is null or undefined.");
      return null; 
    }

    try {
      const ort = await loadOrt();
      console.log("ONNX runtime loaded/retrieved:", ort);

      const modelPath = "/modelo_medico.onnx";
      console.log("Attempting to create ONNX session with modelPath:", modelPath);
      const session = await ort.InferenceSession.create(modelPath);
      console.log("ONNX session created successfully:", session);
      console.log("Input names:", session.inputNames);
      console.log("Output names:", session.outputNames);

      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(imageFile);

      await new Promise<void>((resolve, reject) => {
        imgElement.onload = () => {
          console.log("Image loaded successfully for preprocessing.");
          resolve();
        };
        imgElement.onerror = (err) => {
          console.error("Error loading image for preprocessing:", err);
          reject(new Error("Error al cargar la imagen para preprocesamiento"));
        };
      });

      console.log("Preprocessing image...");
      const preprocessedData = preprocessImage(imgElement);
      URL.revokeObjectURL(imgElement.src); 
      console.log("Image preprocessed. Tensor shape should be [1, 224, 224, 3]");

      const inputName = session.inputNames[0] || "input_1"; 
      console.log(`Using input name: ${inputName}`);
      
      const tensor = new ort.Tensor("float32", preprocessedData, [1, 224, 224, 3]);
      console.log("Input tensor created:", tensor);

      const feeds: Record<string, ort.Tensor> = {};
      feeds[inputName] = tensor;

      console.log("Running inference...");
      const results = await session.run(feeds);
      console.log("Inference results (raw object from session.run):", results);
      
      const outputName = session.outputNames[0] || "output_1"; 
      console.log(`Using output name: ${outputName}`);
      
      if (!results[outputName]) {
        console.error(`Output tensor with name '${outputName}' not found in inference results. Available output names:`, session.outputNames);
        console.error("Full inference results object:", results);
        setPrediction(`Error: No se encontró el tensor de salida esperado ('${outputName}') en los resultados del modelo.`);
        return null;
      }
      
      const outputTensor = results[outputName];
      console.log(`Output tensor for '${outputName}' (before accessing .data):`, outputTensor);

      if (!outputTensor || typeof outputTensor.data === 'undefined') {
        console.error("Output tensor is invalid or does not have a 'data' property. outputTensor:", outputTensor);
        setPrediction("Error: La estructura de salida del modelo es inesperada (tensor de salida inválido o sin propiedad 'data').");
        return null;
      }

      const tensorData = outputTensor.data;
      // Log detallado de tensorData
      console.log("Value of outputTensor.data:", tensorData);
      console.log("Type of outputTensor.data:", typeof tensorData);
      if (tensorData && typeof tensorData === 'object') {
        console.log("Constructor name of outputTensor.data:", tensorData.constructor ? tensorData.constructor.name : 'N/A (no constructor)');
        console.log("Is outputTensor.data an instance of Float32Array?", tensorData instanceof Float32Array);
        console.log("Is outputTensor.data an instance of Array?", tensorData instanceof Array);
        console.log("Length of outputTensor.data (if available):", tensorData.length);
        try {
          console.log("Properties (keys) of outputTensor.data:", Object.keys(tensorData));
          // Intenta convertirlo a string para ver su contenido si es un objeto simple
          console.log("outputTensor.data stringified (if possible):", JSON.stringify(tensorData));
        } catch (e) {
          console.warn("Could not stringify or get keys of outputTensor.data", e);
        }
      }

      // Comprobación más específica: ¿Es un Float32Array y tiene al menos 1 elemento?
      // Se cambia la condición de tensorData.length >= 2 a tensorData.length >= 1
      if (!(tensorData instanceof Float32Array && tensorData.length >= 1)) {
        console.error(
            "Validation Failed: outputTensor.data is not a Float32Array of sufficient length (>= 1).", // Mensaje actualizado
            "Actual data:", tensorData,
            "Is Float32Array:", tensorData instanceof Float32Array,
            "Actual length:", tensorData ? tensorData.length : 'N/A'
        );
        setPrediction("Error: Los datos de salida del modelo no son un array de números flotantes con al menos 1 elemento como se esperaba."); // Mensaje actualizado
        return null;
      }

      const probabilities = tensorData;

      let modelMalignantScore: number;
      let modelBenignScore: number;

      // Si el modelo devuelve un solo valor, asumimos que es P(maligno)
      if (probabilities.length === 1) {
        console.log(`[predictWithModel] Model output is a single value. Assuming it's P(malignant). Value: ${probabilities[0]}`);
        modelMalignantScore = probabilities[0];
        modelBenignScore = 1 - modelMalignantScore; // P(benign) = 1 - P(malignant)
        
        // Asegurarse de que las probabilidades no sean negativas o mayores a 1 debido a errores de punto flotante
        modelMalignantScore = Math.max(0, Math.min(1, modelMalignantScore));
        modelBenignScore = Math.max(0, Math.min(1, modelBenignScore));

      } else {
        // Este caso es por si el modelo alguna vez devuelve 2 o más valores.
        // Basado en el error actual, no se alcanzaría si la longitud es siempre 1.
        console.log(`[predictWithModel] Model output has ${probabilities.length} values. Assuming prob[0]=malignant, prob[1]=benign.`);
        modelMalignantScore = probabilities[0];
        modelBenignScore = probabilities[1]; // Se usaría si hay al menos 2 elementos
      }

      console.log(`[predictWithModel] Interpreted Scores: Malignant = ${modelMalignantScore}, Benign = ${modelBenignScore}`);

      const calculatedPrimaryClass = modelMalignantScore > modelBenignScore ? "malignant" : "benign";
      console.log(`[predictWithModel] Calculated Primary Class: ${calculatedPrimaryClass} (based on ${modelMalignantScore} > ${modelBenignScore})`);

      // Calculate confidence and risk score
      const calculatedConfidence = Math.max(modelBenignScore, modelMalignantScore);
      const calculatedRiskScore = Math.round(modelMalignantScore * 100);
      console.log(`[predictWithModel] Calculated Confidence: ${calculatedConfidence}, Calculated Risk Score: ${calculatedRiskScore}`);

      // Prepare the result object that will be stored
      const predictionResult = {
        results: {
          classification: {
            benign: modelBenignScore,     // Value for pie chart
            malignant: modelMalignantScore, // Value for pie chart
          },
          primaryClass: calculatedPrimaryClass, // Value for display
          confidence: calculatedConfidence,
          riskScore: calculatedRiskScore,       // Value for display
          findings: calculatedPrimaryClass === "malignant" ? ["Características sospechosas detectadas por IA"] : ["Características probablemente benignas detectadas por IA"],
        },
      };
      
      console.log("[predictWithModel] Final predictionResult object to be stored:", JSON.stringify(predictionResult, null, 2));
      
      return predictionResult;

    } catch (error) {
      console.error("Error en predictWithModel:", error);
      // Actualiza el estado de predicción con el mensaje de error específico
      setPrediction(`Error en la predicción del modelo: ${error instanceof Error ? error.message : "Error desconocido"}. Revise la consola.`);
      return null; // Devuelve null para indicar fallo
    }
  };

  const handleAnalyzeImage = async (imageFile: File | null) => {
    console.log("handleAnalyzeImage llamado con:", imageFile);
    if (!imageFile) {
      const errorMsg = "Error: No se proporcionó ningún archivo de imagen para el análisis.";
      console.error(errorMsg);
      setPrediction(errorMsg); // Muestra el error en la UI
      setLoading(false);
      return;
    }

    setLoading(true);
    setPrediction("Analizando imagen, por favor espere..."); // Mensaje informativo durante la carga
    console.log("handleAnalyzeImage: Cargando y preparando para análisis.");

    try {
      const predictionResult = await predictWithModel(imageFile);
      console.log("handleAnalyzeImage: predictWithModel retornó:", predictionResult);

      if (predictionResult && predictionResult.results) {
        localStorage.setItem('latestPrediction', JSON.stringify(predictionResult));
        console.log("handleAnalyzeImage: Predicción guardada en localStorage. Navegando a resultados...");
        
        // Opcional: Mostrar un mensaje de éxito brevemente antes de navegar o limpiar el estado.
        // setPrediction("Análisis completado. Redirigiendo a los resultados...");
        // await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa para ver el mensaje

        setPrediction(null); // Limpia el mensaje de estado antes de navegar
        router.push('/classification-results');
      } else {
        // Si predictWithModel devolvió null o una estructura inválida,
        // el estado 'prediction' ya debería haber sido actualizado con un error dentro de predictWithModel.
        // Si por alguna razón no lo hizo, establecemos un mensaje genérico aquí.
        console.error("handleAnalyzeImage: Falló la predicción o el resultado es inválido.", predictionResult);
        if (!prediction || !prediction.startsWith("Error:")) {
             setPrediction("Error: La predicción falló o el resultado no es válido. Consulte la consola para detalles técnicos.");
        }
        // No se navega si hay un error. El error se muestra en la página actual.
      }
    } catch (error) {
      // Este catch es para errores inesperados en el propio handleAnalyzeImage
      const errorMsg = `Error crítico durante el proceso de análisis: ${error instanceof Error ? error.message : "Error desconocido"}. Consulte la consola.`;
      console.error("handleAnalyzeImage: Error en el bloque catch principal:", error);
      setPrediction(errorMsg);
    } finally {
      setLoading(false);
      console.log("handleAnalyzeImage: Proceso de análisis finalizado (con o sin éxito). Loading puesto a false.");
    }
  };

  const handlePredict = async (fileFromValidator?: File) => {
    const imageToUse = fileFromValidator || validatedImage;

    console.log("handlePredict called. Image to use:", imageToUse);
    if (!imageToUse) {
      console.error("handlePredict: No image found. Aborting prediction.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setPrediction(null); 
    
    try {
      console.log("handlePredict: Calling predictWithModel.");
      const modelPredictionResult = await predictWithModel(imageToUse);
      console.log("handlePredict: predictWithModel call finished.");

      if (modelPredictionResult) {
        console.log("Storing prediction and navigating:", modelPredictionResult);
        localStorage.setItem('latestPrediction', JSON.stringify(modelPredictionResult)); // Aquí se guarda en localStorage
        router.push('/classification-results'); 
      } else {
        console.error("handlePredict: Prediction failed, not navigating.");
        // setLoading(false) should be handled in predictWithModel's error path
      }
    } catch (error) {
      console.error("handlePredict: Unexpected error calling predictWithModel:", error);
      setPrediction("Error inesperado en handlePredict: " + (error as Error).message);
      setLoading(false); // Ensure loading is false on error
    }
    // No finally block needed here for setLoading if all paths handle it or navigate
  };

  // The rest of the component (Tabs, Dialogs for gallery, etc.)
  // Ensure no part of the JSX below references imageSrcForPreview
  return (
    <Tabs defaultValue="upload">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="gallery">Galería</TabsTrigger>
        <TabsTrigger value="upload">Subir y Analizar</TabsTrigger>
      </TabsList>
      <TabsContent value="gallery" className="mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {breastImages.map((imageItem) => ( // Renombrado a imageItem para claridad
            <Dialog key={imageItem.id}> {/* Envuelve cada item en un Dialog y asigna la key aquí */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={imageItem.imageUrl}
                    alt={imageItem.title}
                    width={600}
                    height={400}
                    className="aspect-video object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{imageItem.title}</h3>
                    <p className="text-sm text-muted-foreground">{imageItem.date}</p>
                    <p className="text-sm mt-1">{imageItem.description}</p>
                    <div className="mt-3 flex gap-2">
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedImage(imageItem)} // Opcional: si aún necesitas selectedImage para algo
                        >
                          <Expand className="w-4 h-4 mr-1" /> Ver
                        </Button>
                      </DialogTrigger>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" /> Descargar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* DialogContent para esta imagen específica, dentro del mismo componente Dialog */}
              <DialogContent className="sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
                <DialogHeader>
                  <DialogTitle>{imageItem.title}</DialogTitle>
                  <DialogDescription>
                    {imageItem.date} - {imageItem.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-video">
                  <Image src={imageItem.imageUrl} alt={imageItem.title} fill className="object-contain rounded-md" />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="upload" className="mt-4">
        <ImageValidator 
          onValidImage={handleValidImage} 
          onAnalyze={handlePredict} 
        />
        {/* This is the section where the old preview was. It's now removed. */}
        {/* The error at line 256 was likely from an unremoved reference to imageSrcForPreview here or nearby. */}
        
        {!loading && prediction && (
          <Alert className="mt-4">
            <AlertTitle>Resultado de la Predicción</AlertTitle>
            <AlertDescription>{prediction}</AlertDescription>
          </Alert>
        )}
      </TabsContent>

      {/* El DialogContent condicional que estaba aquí abajo ya no es necesario si cada item tiene el suyo. */}
      {/* Si selectedImage se usa para otros fines, puedes mantener el estado, pero este DialogContent específico se elimina. */}
      {/* 
      {selectedImage && (
        <DialogContent className="sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
          <DialogHeader>
            <DialogTitle>{selectedImage.title}</DialogTitle>
            <DialogDescription>
              {selectedImage.date} - {selectedImage.description}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video">
            <Image src={selectedImage.imageUrl} alt={selectedImage.title} fill className="object-contain rounded-md" />
          </div>
        </DialogContent>
      )} 
      */}
    </Tabs>
  );
}
