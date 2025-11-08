"use client";

import { 
    Create, 
    SimpleForm, 
    TextInput,
    NumberInput,
    ReferenceInput,
    SelectInput,
    required 
} from "react-admin";

export const LessonCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <TextInput source="description" multiline validate={[required()]} />
            <ReferenceInput source="unitId" reference="units">
                <SelectInput optionText="title" validate={[required()]} />
            </ReferenceInput>
            <NumberInput source="order" validate={[required()]} />
        </SimpleForm>
    </Create>
);

