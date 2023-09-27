import BellPepperDescription from "./BellPepperDescription";
import JalapenoDescription from "./JalapenoDescription";
import LongChiliDescription from "./LongChiliDescription";
import PimientoDescription from "./PimientoDescription";
import SilingLabuyoDescription from "./SilingLabuyoDescription";
import ThaiChiliDescription from "./ThaiChiliDescription";

export default function ChiliDescription({
  chili,
}: {
  chili: string | undefined;
}) {
  return (
    <div className="prose prose-slate mx-auto">
      {chili === undefined && null}
      {chili === "Bell Pepper" && <BellPepperDescription />}
      {chili === "Jalapeño" && <JalapenoDescription />}
      {chili === "Long Chili" && <LongChiliDescription />}
      {chili === "Pimiento Pepper" && <PimientoDescription />}
      {chili === "Siling Labuyo" && <SilingLabuyoDescription />}
      {chili === "Thai Chili" && <ThaiChiliDescription />}
    </div>
  );
}
