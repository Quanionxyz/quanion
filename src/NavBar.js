import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";





const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts =await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <Flex justify="space-between" align="center" padding="30px">

            {/* Connect */}
            {isConnected ? (
            <Box margin="0 15px" align="right">Connected</Box>
            ) : (
            <Button
            textAlign="right"
            backgroundColor="#4B0082"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="cursor"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
            >
                Connect
            </Button>
            )}
            </Flex>




    );
};

export default NavBar;