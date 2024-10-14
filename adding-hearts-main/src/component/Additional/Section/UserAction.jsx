import React from "react";
import { modals } from "@mantine/modals";
import Register from "@/pages/register";
import Login from "@/pages/login";
import {
  IconLogin,
  IconLogout,
  IconLogout2,
  IconUserPlus,
  IconUserShield,
} from "@tabler/icons-react";
import { PrimaryColor, SecondaryColor } from "@/styles/color";
import { Avatar, Menu, rem, Tooltip } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import UserForm from "../Forms/UserForm";

const UserAction = () => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Menu>
          <Menu.Target>
            <Avatar
              size={35}
              radius="xl"
              src={session?.user?.profilePicture}
              cursor="pointer"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={
                <IconUserPlus
                  color={PrimaryColor}
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
              onClick={() =>
                modals.open({
                  title: "User Registration",
                  size: "95%",
                  children: <UserForm action="update" data={session.user} />,
                })
              }
            >
              Update Profile
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconLogout
                  color="red"
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
              onClick={() => signOut()}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Tooltip label="Log In">
          <IconLogin
            color={SecondaryColor}
            size={25}
            cursor="pointer"
            onClick={() =>
              modals.open({
                title: "Login",
                //   size: "90%",
                children: <Login mode="modal" />,
              })
            }
          />
        </Tooltip>

        // <Menu shadow="md" width={200}>
        //   <Menu.Target>
        //     <IconUserShield
        //       color={SecondaryColor}
        //       size={30}
        //       style={{
        //         border: "white solid 1px",
        //         borderRadius: "50%",
        //         padding: 3,
        //       }}
        //       cursor="pointer"
        //     />
        //   </Menu.Target>

        //   <Menu.Dropdown>
        //     <Menu.Label>Action</Menu.Label>
        //     <Menu.Item
        //       leftSection={
        //         <IconLogin
        //           color={PrimaryColor}
        //           style={{ width: rem(14), height: rem(14) }}
        //         />
        //       }
        //       onClick={() =>
        //         modals.open({
        //           title: "User Registration",
        //           //   size: "90%",
        //           children: <Login mode="modal" />,
        //         })
        //       }
        //     >
        //       Log in
        //     </Menu.Item>
        //     <Menu.Item
        //       leftSection={
        //         <IconUserPlus
        //           color={PrimaryColor}
        //           style={{ width: rem(14), height: rem(14) }}
        //         />
        //       }
        //       onClick={() =>
        //         modals.open({
        //           title: "User Registration",
        //           size: "95%",
        //           children: <Register />,
        //         })
        //       }
        //     >
        //       Register
        //     </Menu.Item>
        //   </Menu.Dropdown>
        // </Menu>
      )}
    </>
  );
};

export default UserAction;
