import React, { useState } from "react";
import { Formik, FieldArray, Form } from "formik";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import styled from "styled-components";
import { Trigger, JsonFormat, TriggerType } from "../../../types/Trigger";
import TriggerCard from "./TriggerCard";
import {
  triggersToTriggerJsonText,
  triggerJsonTextToTriggers,
} from "../../../encoder/json";
import { download } from "../../../utils/download";

const CardWrapper = styled("div")`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;
const ButtonsArea = styled("div")`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(2)};
  }
`;
const EditForm: React.FunctionComponent = () => {
  const [initialValues, setInitialValues] = useState<{ triggers: Trigger[] }>({
    triggers: [
      {
        displayName: "",
        category: "",
        showConfirmDialog: false,
        color: { r: 256, g: 256, b: 256 },
        state: [
          {
            key: "",
            type: TriggerType.integer,
            value: 0,
          },
        ],
      },
    ],
  });
  const loadJsonFile = () => {
    const fr = new FileReader();
    fr.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        const parsed: JsonFormat = JSON.parse(e.target.result);
        const triggers = triggerJsonTextToTriggers(parsed);
        setInitialValues({ triggers });
      }
    };
    const inputElement = document.createElement("input");
    document.body.appendChild(inputElement);
    inputElement.type = "file";
    inputElement.accept = "application/json";
    // @ts-ignore めんどい
    inputElement.style = "display: none;";
    inputElement.onchange = (e) => {
      // @ts-ignore めんどい
      const file = e.target?.files[0] as File | undefined;
      if (file) {
        fr.readAsText(file);
      }
      inputElement.remove();
    };
    inputElement.click();
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(v) => {
        const triggerJsonText = triggersToTriggerJsonText(v.triggers);
        download(triggerJsonText, "trigger.json", "application/json");
      }}
    >
      {({ values }) => (
        <Form>
          <ButtonsArea>
            <Button type="submit" color="primary">
              JSONをダウンロード
            </Button>
            <Button
              onClick={() => {
                loadJsonFile();
              }}
            >
              JSONを読み込む
            </Button>
          </ButtonsArea>
          <FieldArray
            name="triggers"
            render={(arrayHelpers) => {
              return (
                <>
                  <CardWrapper>
                    {values.triggers.map((trigger, triggerIndex) => (
                      <TriggerCard
                        triggerIndex={triggerIndex}
                        trigger={trigger}
                        remove={() => {
                          arrayHelpers.remove(triggerIndex);
                        }}
                        isFirst={triggerIndex === 0}
                        isLast={triggerIndex === values.triggers.length - 1}
                        moveUp={() => {
                          arrayHelpers.swap(triggerIndex, triggerIndex - 1);
                        }}
                        moveDown={() => {
                          arrayHelpers.swap(triggerIndex, triggerIndex + 1);
                        }}
                        duplication={() => {
                          arrayHelpers.insert(triggerIndex + 1, {
                            ...trigger,
                            displayName: `${trigger.displayName}_copy`,
                          });
                        }}
                      />
                    ))}
                  </CardWrapper>
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      const emptyTrigger: Trigger = {
                        displayName: "",
                        category: "",
                        showConfirmDialog: false,
                        color: { r: 256, g: 256, b: 256 },
                        state: [],
                      };
                      arrayHelpers.push(emptyTrigger);
                    }}
                  >
                    追加
                  </Button>
                </>
              );
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default EditForm;
