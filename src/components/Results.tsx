import { BsX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import ChiliDescription from "./descriptions/ChiliDescription"

interface ResultProps {
  label?: string;
  idx?: string;
  isProcessing?: boolean;
  timeInference?: number;
  probability?: number;
  imageFile: File;
  imageUrl: string;
}

const selectedResultIdAtom = atom<string | undefined>(undefined);

export default function Results({ results }: { results: ResultProps[] }) {
  const [selectedResultId, setSelectedResultId] = useAtom(selectedResultIdAtom);

  return (
    <div className="flex flex-wrap gap-2">
      {results.map((result, index) => (
        <Result
          key={index}
          idx={index.toString()}
          label={result.label}
          probability={result.probability}
          timeInference={result.timeInference}
          imageFile={result.imageFile}
          imageUrl={result.imageUrl}
        />
      ))}

      <AnimatePresence>
        {selectedResultId && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25"
          >
            <motion.div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                layoutId={selectedResultId}
                className="w-full max-w-3xl overflow-y-scroll max-h-[32rem] h-full rounded-lg bg-white p-4 px-6 align-middle shadow-xl"
              >
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-gray-300">
                      <div>
                        <h3 className="text-lg font-medium">
                          {results[Number(selectedResultId)].label}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {results[
                            Number(selectedResultId)
                          ]?.probability?.toFixed(2)}{" "}
                          % probability
                        </p>
                      </div>

                      <button onClick={() => setSelectedResultId(undefined)}>
                        <BsX className="text-red-500 text-xl hover:text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center md:flex-row md:justify-normal md:items-start gap-4">
                    <div className="relative w-56 h-56 bg-white rounded-lg drop-shadow-lg">
                      <img
                        src={URL.createObjectURL(
                          results[Number(selectedResultId)].imageFile
                        )}
                        alt="image"
                        sizes="100%"
                      />
                    </div>

                    <div className="flex-1">
                      <ChiliDescription
                        chili={results[Number(selectedResultId)].label}
                      />
                    </div>
                  </div>
                </div>
                <motion.button onClick={() => setSelectedResultId(undefined)} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Result({
  label,
  idx,
  isProcessing,
  timeInference,
  probability,
  imageFile,
  imageUrl,
}: ResultProps) {
  const [_selectedResultId, setSelectedResultId] =
    useAtom(selectedResultIdAtom);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        layoutId={idx}
        onClick={() => setSelectedResultId(idx)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer rounded-lg overflow-hidden bg-white drop-shadow-lg border border-gray-300/20"
      >
        <motion.div className="relative w-56 h-56 bg-white">
          <img src={imageUrl} alt="image" sizes="100%" />
        </motion.div>

        <motion.div className="p-2 space-y-1">
          <motion.p className="text-lg">
            {isProcessing ? "Predicting..." : label}
          </motion.p>

          {isProcessing ? (
            <>
              <motion.div className="animate-pulse bg-gray-500 h-4 w-3/4 rounded-sm" />
              <motion.div className="animate-pulse bg-gray-500 h-4 w-1/2 rounded-sm" />
            </>
          ) : (
            <>
              <motion.p className="text-sm text-gray-500">
                {probability?.toFixed(2)}% probability
              </motion.p>
              <motion.p className="text-sm text-gray-500">
                {((timeInference || 0) / 1000).toFixed(2)} secs
              </motion.p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}