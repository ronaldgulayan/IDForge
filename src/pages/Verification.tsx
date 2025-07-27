import {
  Avatar,
  Card,
  Container,
  Divider,
  Loader,
  Table,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../supabase";
import type { GlobalAccountProps } from "../types";
import {
  IconBrandGithubFilled,
  IconCircleCheckFilled,
  IconCode,
} from "@tabler/icons-react";
import { calculateAge, toProper } from "../helpers/methods";

async function sleep(seconds: number): Promise<void> {
  await new Promise((resolve) => {
    window.setTimeout(() => resolve(null), seconds * 1000);
  });
}

function Verification() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Checking ID...");
  const [account, setAccount] = useState<GlobalAccountProps | null>(null);

  async function fetchData() {
    if (!id) return;

    setLoading(true);

    try {
      setMessage("Checking ID...");
      await sleep(1);

      const idPattern = /^\d{3}-\d{4}-\d{3}$/;
      if (!idPattern.test(id)) {
        setMessage("The provided ID is invalid.");
        return;
      }

      setMessage("Verifying account...");
      const { error: searchError, data: userAccount } = await supabase
        .from("accounts")
        .select()
        .eq("account_id", id)
        .single();

      await sleep(2);

      if (searchError || !userAccount) {
        setMessage("Account not found.");
        return;
      }

      setMessage("Loading account...");
      await sleep(2);

      setAccount(userAccount);
      setMessage("");
    } catch (error: any) {
      setMessage(`An unexpected error occurred: ${error.toString()}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='relative h-screen'>
      <Container
        py={50}
        className='lg:w-1/2 md:w-[70%] w-full'
      >
        <Card
          shadow='lg'
          withBorder
        >
          <Text
            ff='montserrat-black'
            ta='center'
            mb={10}
            size='xl'
          >
            IDForge: Digital ID Generator System
          </Text>
          <Divider />
          <div className='flex items-center justify-between mt-4'>
            <Text
              ff='montserrat-black'
              size='xl'
            >
              ID: {id}
            </Text>
            {!message && account && (
              <div className='flex items-center gap-x-2'>
                <Text
                  ff='montserrat-semibold'
                  c='green'
                >
                  Account Verified!
                </Text>
                <IconCircleCheckFilled
                  size={20}
                  color='green'
                />
              </div>
            )}
          </div>
          <Divider my={12} />
          {message ? (
            <div className='w-full flex items-center justify-center flex-col gap-3 py-10'>
              {loading && (
                <Loader
                  size='lg'
                  color='dark'
                />
              )}
              <Text
                ff='montserrat-bold'
                size='xl'
              >
                {message}
              </Text>
            </div>
          ) : (
            <div>
              {account ? (
                <div>
                  <div className='flex md:flex-row flex-col gap-3'>
                    <Avatar
                      radius={0}
                      style={{
                        border: "1px solid #0005",
                      }}
                      size={150}
                      src={account.profile}
                    />
                    <div className='md:w-[calc(100%-150px)] w-full'>
                      <Text
                        ff='montserrat-black'
                        fz={30}
                      >
                        {toProper(`${account.firstname} ${account.lastname}`)}
                      </Text>
                      <Text
                        ff='montserrat-regular'
                        size='md'
                      >
                        {account.position}
                      </Text>
                      <Divider my={10} />
                      <Table>
                        <Table.Tbody>
                          <Table.Tr>
                            <Table.Th>Email Address:</Table.Th>
                            <Table.Td>{account.email}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Th>Contact:</Table.Th>
                            <Table.Td>{account.contact}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Th>Gender:</Table.Th>
                            <Table.Td>{account.gender}</Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Th>Date of Birth:</Table.Th>
                            <Table.Td>
                              {new Date(account.birthdate).toLocaleDateString()}
                            </Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Th>Current Age:</Table.Th>
                            <Table.Td>
                              {`${calculateAge(
                                new Date(account.birthdate),
                              )} years old`}
                            </Table.Td>
                          </Table.Tr>
                          <Table.Tr>
                            <Table.Th>Date Registered:</Table.Th>
                            <Table.Td>
                              {new Date(account.created_at).toDateString()}
                            </Table.Td>
                          </Table.Tr>
                        </Table.Tbody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Account Not Found</div>
              )}
            </div>
          )}
          <div className='flex items-center justify-between border-t border-t-slate-300 pt-4'>
            <Text size='sm'>
              Don't have an account?{" "}
              <Link
                className='underline hover:text-blue-500'
                to='/'
              >
                Register
              </Link>
            </Text>
            <div className='flex items-center gap-x-2'>
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
        </Card>
      </Container>
    </div>
  );
}

export default Verification;
