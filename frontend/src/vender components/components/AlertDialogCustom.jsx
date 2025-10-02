import {Button, AlertDialog, Flex} from "@radix-ui/themes";

export default function AlertDialogCustom({buttonText,buttonColor,description,onSaveClick,disabledText,isLoading}){

    return(
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color={buttonColor} loading={isLoading} style={{zIndex:"1000",cursor:"pointer"}}>{buttonText}</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>{buttonText}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {!disabledText ? description : disabledText}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Action>
                        <Button variant="solid" color={disabledText ? "red" : "green"} onClick={onSaveClick}>
                            Зберегти
                        </Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Відміна
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}