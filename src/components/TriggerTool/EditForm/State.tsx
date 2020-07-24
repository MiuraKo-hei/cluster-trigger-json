import React from "react";
import styled, { css } from "styled-components";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import CloseIcon from "@material-ui/icons/Close";
import { TriggerType, TriggerState } from "../../../types/Trigger";

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
const CloseButton = styled(IconButton)`
  position: absolute;
  right: ${(props) => props.theme.spacing(1)};
  top: ${(props) => props.theme.spacing(1)};
  color: ${(props) => props.theme.palette.grey[500]};
`;
const Container = styled(Paper)`
  position: relative;
  padding: ${({ theme }) => theme.spacing(2, 3)};
  display: flex;
  flex-wrap: wrap;

  & > * {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    &:not(:last-child) {
      margin-right: ${({ theme }) => theme.spacing(2)};
    }
  }
  & > ${CloseButton} {
    margin: 0;
  }
`;
const StyledSelect = styled(Select)`
  width: 120px;
`;
const FieldWrapper = styled("div")``;
const valueFieldStyle = css`
  width: 120px;
`;
const ValueTextField = styled(TextField)`
  ${valueFieldStyle}
`;
const ValueFormControlLabel = styled(FormControlLabel)`
  ${valueFieldStyle}
`;
type Props = {
  triggerIndex: number;
  stateIndex: number;
  state: TriggerState;
  remove: () => void;
};

const State: React.FunctionComponent<Props> = ({
  triggerIndex,
  stateIndex,
  state,
  remove,
}) => {
  return (
    <Container>
      <CloseButton onClick={remove}>
        <CloseIcon />
      </CloseButton>
      <FieldWrapper>
        <Label required>key</Label>
        <Field name={`triggers.${triggerIndex}.state.${stateIndex}.key`}>
          {({ field }: FieldProps) => <TextField {...field} required />}
        </Field>
      </FieldWrapper>
      <FieldWrapper>
        <Label required>type</Label>
        <Field name={`triggers.${triggerIndex}.state.${stateIndex}.type`}>
          {({ field, form }: FieldProps) => (
            <StyledSelect
              {...field}
              onChange={({ target }) => {
                switch (target.value) {
                  case TriggerType.boolean: {
                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.type`,
                      target.value
                    );

                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.value`,
                      false
                    );
                    break;
                  }
                  case TriggerType.float:
                  case TriggerType.integer: {
                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.type`,
                      target.value
                    );

                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.value`,
                      0
                    );
                    break;
                  }
                  case TriggerType.signal: {
                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.type`,
                      target.value
                    );
                    form.setFieldValue(
                      `triggers.${triggerIndex}.state.${stateIndex}.value`,
                      undefined
                    );
                    break;
                  }
                  default: {
                    break;
                  }
                }
              }}
            >
              <MenuItem value={TriggerType.boolean}>boolean</MenuItem>
              <MenuItem value={TriggerType.integer}>integer</MenuItem>
              <MenuItem value={TriggerType.float}>float</MenuItem>
              <MenuItem value={TriggerType.signal}>signal</MenuItem>
            </StyledSelect>
          )}
        </Field>
      </FieldWrapper>
      {(state.type === TriggerType.integer ||
        state.type === TriggerType.float) && (
        <FieldWrapper>
          <Label required>value</Label>
          <Field name={`triggers.${triggerIndex}.state.${stateIndex}.value`}>
            {({ field }: FieldProps) => (
              <ValueTextField {...field} type="number" required />
            )}
          </Field>
        </FieldWrapper>
      )}
      {state.type === TriggerType.boolean && (
        <FieldWrapper>
          <Label>value</Label>
          <Field name={`triggers.${triggerIndex}.state.${stateIndex}.value`}>
            {({ field }: FieldProps) => (
              <ValueFormControlLabel
                control={<Checkbox checked={Boolean(field.value)} {...field} />}
                label="true"
              />
            )}
          </Field>
        </FieldWrapper>
      )}
    </Container>
  );
};

export default State;
