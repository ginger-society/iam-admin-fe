import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Text, TextSize } from "@ginger-society/ginger-ui";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";




const UserForm = () => {

  const [email, setEmail] = useState<string>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const paths: BreadcrumbItem[] = useMemo(() => {
    return [
      { path: '/', label: 'Home' },
      { path: '/users', label: 'Users' },
      { path: '', label: `Editing : ${id}` },
    ]
  }, [id])

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>User form</Text>

      <div style={{ width: '50%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Input
          label="Email ID"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="First Name"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="Last Name"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Checkbox
          label="Is Admin"
          checked={isAdmin}
          onChange={(checked) => setIsAdmin(checked)}
        />
        <Button type={ButtonType.Primary} label="Save" />
      </div>
    </Layout>
  )
}

export default UserForm;