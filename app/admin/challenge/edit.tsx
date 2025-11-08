"use client";

import { 
    Edit, 
    SimpleForm, 
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required 
} from "react-admin";

export const ChallengeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <SelectInput 
                source="type" 
                choices={[
                    { id: 'SELECT', name: 'SELECT' },
                    { id: 'ASSIST', name: 'ASSIST' },
                ]}
                validate={[required()]} 
            />
            <TextInput source="question" multiline validate={[required()]} />
            <ReferenceInput source="lessonId" reference="lessons">
                <SelectInput optionText="title" validate={[required()]} />
            </ReferenceInput>
            <NumberInput source="order" validate={[required()]} />
        </SimpleForm>
    </Edit>
);

