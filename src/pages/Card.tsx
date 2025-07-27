import type { GlobalCardProps } from "../types";
import Back from "./cards/Back";
import Front from "./cards/Front";
import "./styles/card.css";

type CardProps = GlobalCardProps & {
  isFlip: boolean;
};

function Card(props: CardProps) {
  return (
    <div
      data-flip={props.isFlip}
      className='card-container'
    >
      <Front
        data={props.data}
        setData={props.setData}
      />
      <Back
        data={props.data}
        setData={props.setData}
      />
    </div>
  );
}

export default Card;
