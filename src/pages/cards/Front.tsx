import { Avatar, Divider, Text } from "@mantine/core";
import { IconCode, IconMail, IconPhone } from "@tabler/icons-react";
import type { GlobalCardProps } from "../../types";
import { toProper } from "../../helpers/methods";

function toCode(label: string, text: string) {
  return (
    <Text
      size='xs'
      pl={10}
    >
      <span style={{ color: "blue" }}>"{label}"</span>
      <span>: </span>
      <span style={{ color: "green" }}>"{text}"</span>
    </Text>
  );
}

function Front(props: GlobalCardProps) {
  return (
    <div className='front px-3 py-2 text-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <IconCode size={25} />
          <Text
            ff='montserrat-semibold'
            size='sm'
          >
            {props.data.position || "Position"}
          </Text>
        </div>
        <Text
          ff='montserrat-bold'
          size='sm'
        >
          JSON
        </Text>
      </div>
      <Divider
        color='#0008'
        my={8}
      />
      <div className='flex gap-2'>
        <Avatar
          size={125}
          src={props.data.preview}
          radius={0}
          style={{
            border: "1px solid #0005",
          }}
        />
        <div className='w-[calc(100%-125px)] h-[125px] overflow-hidden flex items-center'>
          <div>
            <span className='text-violet-600 text-sm'>{"{"}</span>
            <br />
            {toCode("ID", props.data.id)}
            {toCode("Position", props.data.position || "-")}
            {toCode("Given Name", toProper(props.data.firstname) || "-")}
            {toCode("Surname", toProper(props.data.lastname) || "-")}
            {toCode("Gender", props.data.gender || "None")}
            <span className='text-violet-600 text-sm'>{"}"}</span>
          </div>
        </div>
      </div>
      <div className='text-xs h-7 flex items-center gap-x-2'>
        <span className='flex items-center gap-x-1'>
          <IconMail size={12} />
          <span>{props.data.email.toLowerCase() || "-"}</span>
        </span>
        <span className='flex items-center gap-x-1'>
          <IconPhone size={12} />
          <span>{props.data.contact || "-"}</span>
        </span>
      </div>
    </div>
  );
}

export default Front;
