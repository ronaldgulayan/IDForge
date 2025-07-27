import { Divider, Text } from "@mantine/core";
import { IconCode } from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";
import BackItem from "./components/BackItem";
import type { GlobalCardProps } from "../../types";

function Back(props: GlobalCardProps) {
  return (
    <div className='back px-3 h-full py-2 text-sm grid grid-rows-1 grid-cols-2 gap-x-3'>
      <div className='h-full'>
        <div className='flex items-end gap-x-2'>
          <IconCode size={20} />
          <Text
            size='xs'
            ff='montserrat-semibold'
          >
            IDForge.tsx
          </Text>
        </div>
        <Divider
          color='#0005'
          my={8}
        />
        <div className='h-[calc(100%-3.8rem)] space-y-[0.4rem] flex flex-col'>
          <BackItem
            label='Date Created'
            value={new Date().toLocaleDateString()}
          />
          <BackItem
            label='Date of Birth'
            value={
              props.data.birthdate
                ? new Date(props.data.birthdate).toLocaleDateString()
                : "-"
            }
          />
          <BackItem
            label='Position'
            value={props.data.position || "-"}
          />
        </div>
        <div className='pt-1 flex font-montserrat-black items-end justify-center border-t border-t-[#0005]'>
          {props.data.id}
        </div>
      </div>
      <div className='pt-1 h-full'>
        <div className='w-full h-[calc(100%-1.5rem)]'>
          <QRCodeSVG
            style={{
              width: "100%",
              height: "100%",
            }}
            value={`${window.location.href}${props.data.id}`}
          />
        </div>
        <div className='h-6 text-[0.48rem] leading-[0.65rem] text-center pt-[0.25rem]'>
          Scan this code to simulate account verification.
        </div>
      </div>
    </div>
  );
}

export default Back;
