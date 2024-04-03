import { AttributeForm } from "../../../components/form/attribute-form"

export const EditAttribute = () => {
  return (
    <div>
        <AttributeForm onSubmit={() => console.log("Hello")
        } initialValues={[]}/>
    </div>
  )
}
