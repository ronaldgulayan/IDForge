import { Divider, Text } from "@mantine/core";
import { IconCode, IconMail, IconPhone } from "@tabler/icons-react";
import type { GlobalCardProps } from "../../types";
import { toProper } from "../../helpers/methods";

function toCode(label: string, text: string) {
  return (
    <div className='pl-2'>
      <span style={{ color: "blue" }}>"{label}"</span>
      <span>: </span>
      <span style={{ color: "green" }}>"{text}",</span>
    </div>
  );
}

function Front(props: GlobalCardProps) {
  return (
    <div className='front px-3 py-2 text-sm'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <IconCode size={25} />
          <div className='font-montserrat-bold'>
            {props.data.position || "Position"}
          </div>
        </div>
        <Text
          ff='montserrat-bold'
          size='sm'
          c='blue'
        >
          JSON
        </Text>
      </div>
      <Divider
        color='#0008'
        my={8}
      />
      <div className='flex flex-col h-fit'>
        <div className='flex gap-1 h-[110px]'>
          <img
            alt='No Image Found'
            className='border border-[#0005] w-[110px] h-[110px] rounded-[2px]'
            src={props.data.preview}
          />
          <div className='w-[calc(100%-110px)] font-montserrat-regular h-full flex items-center'>
            <div className='h-fit text-[0.6rem] md:text-[0.6rem]'>
              <span className='text-violet-600'>{"{"}</span>
              <br />
              {toCode("ID", props.data.id)}
              {toCode("Position", props.data.position || "-")}
              {toCode("Given Name", toProper(props.data.firstname) || "-")}
              {toCode("Surname", toProper(props.data.lastname) || "-")}
              {toCode("Gender", props.data.gender || "None")}
              <span className='text-violet-600'>{"}"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='text-[0.6rem] md:text-xs flex font-montserrat-regular items-center h-7 gap-x-2 overflow-hidden'>
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
