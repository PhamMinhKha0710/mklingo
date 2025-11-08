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

export const UnitCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <TextInput source="description" multiline validate={[required()]} />
            <ReferenceInput source="courseId" reference="courses">
                <SelectInput optionText="title" validate={[required()]} />
            </ReferenceInput>
            <NumberInput source="order" validate={[required()]} />
        </SimpleForm>
    </Create>
);

