import { Text } from "@mantine/core";

interface BackItemProps {
  label: string;
  value: string;
}

function BackItem(props: BackItemProps) {
  return (
    <div>
      <Text fz={9}>{props.label}</Text>
      <p className='font-montserrat-bold md:text-xs text-[0.7rem] leading-[0.75rem] md:leading-[0.8rem]'>
        {props.value}
      </p>
    </div>
  );
}

export default BackItem;
