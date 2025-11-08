"use client";

import { 
    Edit, 
    SimpleForm, 
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    required 
} from "react-admin";

export const ChallengeOptionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="text" validate={[required()]} />
            <BooleanInput source="correct" />
            <ReferenceInput source="challengeId" reference="challenges">
                <SelectInput optionText="question" validate={[required()]} />
            </ReferenceInput>
            <TextInput source="imageSrc" label="Image Source" />
            <TextInput source="audioSrc" label="Audio Source" />
        </SimpleForm>
    </Edit>
);

