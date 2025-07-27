import {
  Button,
  Divider,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import type { GlobalCardProps, GlobalGenderProps } from "../types";
import { positions } from "../helpers/methods";
import {
  IconBrandGithubFilled,
  IconCode,
  IconDownload,
} from "@tabler/icons-react";
import type React from "react";
import { Link } from "react-router-dom";

type FormProps = GlobalCardProps & {
  loading: boolean;
  submit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function Form(props: FormProps) {
  return (
    <div className='md:w-[23rem] full space-y-3'>
      <Text
        ff='montserrat-black'
        size='lg'
        className='md:block hidden'
      >
        Card Information
      </Text>
      <Divider my={8} />
      <Select
        label='Position'
        placeholder='Enter Position'
        required
        value={props.data.position}
        clearable
        searchable
        checkIconPosition='right'
        onChange={(value) =>
          props.setData((curr) => ({ ...curr, position: value }))
        }
        data={positions}
      />
      <Group
        grow
        gap={10}
      >
        <TextInput
          label='Given Name'
          placeholder='Enter Given Name'
          maxLength={15}
          required
          value={props.data.firstname}
          onChange={(e) =>
            props.setData((curr) => ({ ...curr, firstname: e.target.value }))
          }
        />
        <TextInput
          label='Surname'
          placeholder='Enter Surname'
          maxLength={15}
          required
          value={props.data.lastname}
          onChange={(e) =>
            props.setData((curr) => ({ ...curr, lastname: e.target.value }))
          }
        />
      </Group>
      <Group
        grow
        gap={8}
      >
        <TextInput
          label='Email Address'
          placeholder='Enter Email'
          maxLength={30}
          required
          type='email'
          value={props.data.email}
          onChange={(e) =>
            props.setData((curr) => ({ ...curr, email: e.target.value }))
          }
        />
        <NumberInput
          hideControls
          required
          label='Contact'
          placeholder='Enter Contact'
          allowDecimal={false}
          allowNegative={false}
          maxLength={11}
          value={props.data.contact}
          onChange={(value) =>
            props.setData((curr) => ({ ...curr, contact: value }))
          }
        />
      </Group>
      <Group
        grow
        gap={8}
        align='start'
      >
        <Select
          checkIconPosition='right'
          searchable
          required
          label='Gender'
          placeholder='Select Gender'
          data={["Male", "Female", "Preferred not to say"]}
          clearable
          value={props.data.gender}
          onChange={(value) =>
            props.setData((curr) => ({
              ...curr,
              gender: value as GlobalGenderProps,
            }))
          }
        />
        <DatePickerInput
          label='Date of Birth'
          required
          placeholder='Date of Birth'
          maxDate={new Date()}
          minDate={new Date(1900, 0, 1)}
          clearable
          value={props.data.birthdate}
          onChange={(value) =>
            props.setData((curr) => ({ ...curr, birthdate: value }))
          }
        />
      </Group>
      <span className='space-y-2 block md:hidden'>
        <Button
          loading={props.loading}
          loaderProps={{ type: "dots" }}
          onClick={props.submit}
          fullWidth
          type='submit'
          color='dark'
          leftSection={<IconDownload size={18} />}
          disabled={Object.entries(props.data).some((v) => !v[1])}
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
  );
}

export default Form;
