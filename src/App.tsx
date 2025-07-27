import { Button, FileInput, Group, Text } from "@mantine/core";
import React, { useState } from "react";
import Form from "./pages/Form";
import {
  IconBrandGithubFilled,
  IconCode,
  IconDownload,
  IconFlipVertical,
} from "@tabler/icons-react";
import Card from "./pages/Card";
import type { GlobalDataProps } from "./types";
import { genetateCardId, uploadProfileImage } from "./helpers/methods";
import supabase from "./supabase";
import { Link } from "react-router-dom";
import { modals } from "@mantine/modals";

const SYSTEM_TITLE = "IDForge: Digital ID Generator System";

function App() {
  const [isFlip, setIsFlip] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [data, setData] = useState<GlobalDataProps>({
    position: "",
    firstname: "",
    lastname: "",
    birthdate: null,
    email: "",
    gender: null,
    contact: "",
    file: null,
    id: genetateCardId(),
  });

  function reset() {
    setData({
      position: null,
      firstname: "",
      lastname: "",
      birthdate: null,
      email: "",
      gender: null,
      contact: "",
      file: null,
      id: genetateCardId(),
    });
    setIsFlip(false);
  }

  async function submitEventHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();

    const confirmation = await new Promise((resolve) => {
      modals.openConfirmModal({
        title: 'Confirm Download',
        children: (
          <Text size="sm">
            Are you sure you want to download and register this card?
          </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => resolve(false),
        onConfirm: () => resolve(true),
      });
    });

    if (!confirmation) return;

    try {
      setSubmitLoading(true);
      let profileUrl = await uploadProfileImage(data.file as File, data.id);
      await supabase.from("accounts").insert({
        account_id: data.id,
        position: data.position,
        firstname: data.firstname.trim(),
        lastname: data.lastname.trim(),
        email: data.email.trim(),
        contact: data.contact,
        gender: data.gender,
        birthdate: data.birthdate,
        profile: profileUrl,
      });
      window.print();
      reset()
    } catch (error: any) {
      window.alert(`Something Error: ${error.toString()}`);
    } finally {
      setSubmitLoading(false);
    }
  }

  return (
    <div className=' bg-[url(./images/bg2.png)] md:py-0 py-7 bg-no-repeat bg-center bg-cover w-full min-h-screen flex flex-col items-center justify-center bg-slate-50'>
      <Text
        ff='montserrat-black'
        size='xl'
        mb={10}
      >
        {SYSTEM_TITLE}
      </Text>
      <div className='flex md:flex-row flex-col gap-x-4 px-10 pb-6 md:pt-10 pt-7 rounded-lg border border-slate-400 shadow-lg bg-white'>
        <div className='space-y-2 w-fit'>
          <Text
            ff='montserrat-black'
            size='lg'
            className='block md:hidden'
            mb={10}
          >
            Card Information
          </Text>
          <Card
            data={data}
            setData={setData}
            isFlip={isFlip}
          />
          <Group
            grow
            gap={8}
          >
            <FileInput
              accept='image/png, image/jpeg, image/jpg'
              placeholder='Select your profile'
              clearable
              value={data.file}
              onChange={(value) =>
                setData((curr) => ({
                  ...curr,
                  file: value,
                  preview: value ? URL.createObjectURL(value) : undefined,
                }))
              }
            />
            <Button
              leftSection={<IconFlipVertical size={18} />}
              onClick={() => setIsFlip(!isFlip)}
            >
              Flip
            </Button>
          </Group>
          <span className='space-y-2 md:block hidden'>
            <Button
              loading={submitLoading}
              loaderProps={{ type: "dots" }}
              onClick={submitEventHandler}
              fullWidth
              type='submit'
              color='dark'
              leftSection={<IconDownload size={18} />}
              disabled={Object.entries(data).some((v) => !v[1])}
            >
              Download and Register Card
            </Button>
            <div className='flex items-start justify-between'>
              <Text
                size='xs'
                c='dimmed'
              >
                Developed by Ron
              </Text>
              <div className='flex gap-x-2'>
                <Link
                  target='_blank'
                  to='https://ronaldgulayan.github.io/portfolio/'
                >
                  <IconCode size={17} />
                </Link>
                <Link
                  target='_blank'
                  to='https://github.com/ronaldgulayan/id-generator'
                >
                  <IconBrandGithubFilled size={17} />
                </Link>
              </div>
            </div>
          </span>
        </div>
        <Form
          loading={submitLoading}
          submit={submitEventHandler}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
}

export default App;
