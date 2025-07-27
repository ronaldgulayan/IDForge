import { Text } from "@mantine/core";

interface BackItemProps {
  label: string;
  value: string;
}

function BackItem(props: BackItemProps) {
  return (
    <div>
      <Text fz={9}>{props.label}</Text>
      <Text
        lh={1}
        ff='montserrat-bold'
        size='sm'
      >
        {props.value}
      </Text>
    </div>
  );
}

export default BackItem;
