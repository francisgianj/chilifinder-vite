import { useDropzone } from "react-dropzone";
import { CgSpinner } from "react-icons/cg";
import useInferenceDropzone, { resultsAtom } from "../hooks/useInferenceDropzone";
import { useAtom } from "jotai";
import Results from "./Results";

export default function ImagePredict() {
    const [results] = useAtom(resultsAtom);
    const { isModelLoading, modelAtom, onDrop } = useInferenceDropzone();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
          "image/jpeg": [".jpeg"],
          "image/jpg": [".jpg"],
          "image/bmp": [".bmp"],
          "image/png": [".png"],
        },
        multiple: false,
      });

      return (
        <div className="space-y-2">
          <div
            {...getRootProps()}
            className="h-52 px-2 py-8 md:px-4 md:py-16 flex items-center justify-center cursor-pointer border-2 border-gray-400 hover:border-gray-800 border-dotted"
          >
            <input
              {...getInputProps()}
              type="file"
              placeholder="Upload an image"
              accept="image/jpeg, image/jpg, image/bmp, image/png"
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="text-gray-400 text-center space-y-2">
                <p>Drag and drop some files here, or click to select files</p>
                <p className="italic text-sm">
                  (Only *.jpeg, *.jpg, *.bmp, *.png images will be accepted)
                </p>
              </div>
            )}
          </div>
    
          {isModelLoading ? (
            <div className="flex gap-2 items-center">
              <p className="text-sm md:text-base">Loading model...</p>
              <CgSpinner className="text-sm md:text-base text-red-500 animate-spin" />
            </div>
          ) : (
            <p className="text-sm md:text-base text-red-500">
              Model loaded in {((modelAtom?.timeLoadModel || 0) / 1000).toFixed(2)}{" "}
              secs
            </p>
          )}
    
          <p className="text-xs md:text-sm text-gray-600">
            The pre-trained model will be loaded as soon as you drop or upload an
            image for the first time. It may take a few seconds to complete the
            loading process.
          </p>
    
          <Results results={results} />
        </div>
      );
}

