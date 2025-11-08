"use client";

import { 
    Create, 
    SimpleForm, 
    TextInput,
    BooleanInput,
    ReferenceInput,
    SelectInput,
    required 
} from "react-admin";

export const ChallengeOptionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="text" validate={[required()]} />
            <BooleanInput source="correct" defaultValue={false} />
            <ReferenceInput source="challengeId" reference="challenges">
                <SelectInput optionText="question" validate={[required()]} />
            </ReferenceInput>
            <TextInput source="imageSrc" label="Image Source" />
            <TextInput source="audioSrc" label="Audio Source" />
        </SimpleForm>
    </Create>
);

