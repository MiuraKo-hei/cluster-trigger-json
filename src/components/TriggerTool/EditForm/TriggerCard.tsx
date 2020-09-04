import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PostAddIcon from "@material-ui/icons/PostAdd";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Field, FieldProps, FieldArray } from "formik";
import styled from "styled-components";
import { TwitterPicker } from "react-color";
import {
  TriggerState,
  TriggerType,
  Trigger,
  TriggerColor,
} from "../../../types/Trigger";
import State from "./State";

const NameAndCategory = styled("div")`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)};
    }
  }
`;
const StyledCard = styled(Card)<{ triggerColor: TriggerColor }>`
  position: relative;
  background: linear-gradient(
    270deg,
    #fff 99%,
    ${({ triggerColor }) =>
        `rgb(${triggerColor.r}, ${triggerColor.g}, ${triggerColor.b})`}
      50%,
    ${({ triggerColor }) =>
      `rgb(${triggerColor.r}, ${triggerColor.g}, ${triggerColor.b})`}
  );
  padding-left: ${({ theme }) => theme.spacing(1)};
`;
const Label = styled(Typography).attrs({ variant: "body1" })<{
  required?: boolean;
}>`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  ::after {
    content: ${(props) => (props.required ? "'*'" : "")};
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;
const StyledCardContent = styled(CardContent)`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
  & > ${NameAndCategory} {
    margin-bottom: ${({ theme }) => theme.spacing(0)};
  }
`;
const StateWrapper = styled("div")`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }
`;

const Buttons = styled("div")`
  display: flex;
  position: absolute;
  right: ${(props) => props.theme.spacing(1)};
  top: ${(props) => props.theme.spacing(1)};
`;
const ButtonBase = styled(IconButton).attrs({ size: "small" })``;
const CloseButton = styled(ButtonBase)``;
const DownButton = styled(ButtonBase)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;
const UpButton = styled(ButtonBase)``;
const DuplicationButton = styled(ButtonBase)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;
const FieldWrapper = styled("div")``;

type Props = {
  triggerIndex: number;
  trigger: Trigger;
  remove: () => void;
  isFirst: boolean;
  isLast: boolean;
  moveUp: () => void;
  moveDown: () => void;
  duplication: () => void;
};

const TriggerCard: React.FunctionComponent<Props> = ({
  triggerIndex,
  trigger,
  remove,
  isFirst,
  isLast,
  moveUp,
  moveDown,
  duplication,
}) => {
  return (
    <StyledCard triggerColor={trigger.color}>
      <Buttons>
        <DuplicationButton onClick={duplication}>
          <PostAddIcon />
        </DuplicationButton>
        <UpButton disabled={isFirst} onClick={moveUp}>
          <ArrowUpwardIcon />
        </UpButton>
        <DownButton disabled={isLast} onClick={moveDown}>
          <ArrowDownwardIcon />
        </DownButton>
        <CloseButton onClick={remove}>
          <CloseIcon />
        </CloseButton>
      </Buttons>
      <StyledCardContent>
        <NameAndCategory>
          <FieldWrapper>
            <Label required>displayName</Label>
            <Field name={`triggers.${triggerIndex}.displayName`}>
              {({ field }: FieldProps) => <TextField {...field} required />}
            </Field>
          </FieldWrapper>
          <FieldWrapper>
            <Label>category</Label>
            <Field name={`triggers.${triggerIndex}.category`}>
              {({ field }: FieldProps) => <TextField {...field} />}
            </Field>
          </FieldWrapper>
          <FieldWrapper>
            <Label>showConfirmDialog</Label>
            <Field name={`triggers.${triggerIndex}.showConfirmDialog`}>
              {({ field }: FieldProps) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={Boolean(field.value)} {...field} />
                  }
                  label="ダイアログ有り"
                />
              )}
            </Field>
          </FieldWrapper>
        </NameAndCategory>
        <FieldWrapper>
          <Label>color</Label>
          <Field name={`triggers.${triggerIndex}.color`}>
            {({ field, form }: FieldProps) => (
              <TwitterPicker
                triangle="hide"
                color={field.value}
                onChangeComplete={({ rgb }) => {
                  form.setFieldValue(field.name, rgb);
                }}
              />
            )}
          </Field>
        </FieldWrapper>
        <FieldWrapper>
          <Label required>state</Label>
          <FieldArray
            name={`triggers.${triggerIndex}.state`}
            render={(arrayHelpers) => {
              return (
                <StateWrapper>
                  {trigger.state.map((state, stateIndex) => (
                    <State
                      triggerIndex={triggerIndex}
                      stateIndex={stateIndex}
                      state={state}
                      remove={() => {
                        arrayHelpers.remove(stateIndex);
                      }}
                      isFirst={stateIndex === 0}
                      isLast={stateIndex === trigger.state.length - 1}
                      moveUp={() => {
                        arrayHelpers.swap(stateIndex, stateIndex - 1);
                      }}
                      moveDown={() => {
                        arrayHelpers.swap(stateIndex, stateIndex + 1);
                      }}
                      duplication={() => {
                        arrayHelpers.insert(stateIndex + 1, {
                          ...state,
                          key: `${state.key}_copy`,
                        });
                      }}
                    />
                  ))}
                  <Button
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => {
                      const emptyState: TriggerState = {
                        key: "",
                        type: TriggerType.integer,
                        value: 0,
                      };
                      arrayHelpers.push(emptyState);
                    }}
                  >
                    追加
                  </Button>
                </StateWrapper>
              );
            }}
          />
        </FieldWrapper>
      </StyledCardContent>
    </StyledCard>
  );
};

export default TriggerCard;
