import { Label, Input } from "@/src/components/ui/ui";
import Rate from "rc-rate";
import "rc-rate/assets/index.css";

export default function ReviewsForm({
  text,
  setText,
  rating,
  handleRating,
}: {
  text: string;
  setText: any;
  rating: number;
  handleRating: any;
}) {
  return (
    <>
      <div className="mb-6">
        <Label label="Your review:" htmlFor="text" />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your Review."
          type="text" name={"reviewtext"}        />
      </div>
      <div className="mb-6">
        <Label label="Your Rating:" htmlFor="rating" />
        <Rate
          value={rating}
          onChange={handleRating}
          className="text-red-400"
          allowHalf // Allows half star ratings
        />
      </div>
    </>
  );
}
