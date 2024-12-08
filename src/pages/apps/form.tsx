import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Text, TextSize } from "@ginger-society/ginger-ui";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";




const AppForm = () => {

  const [email, setEmail] = useState<string>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  const paths: BreadcrumbItem[] = useMemo(() => {
    return [
      { path: '/', label: 'Home' },
      { path: '/apps', label: 'Apps' },
      { path: '', label: `Editing : ${id}` },
    ]
  }, [id])

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>App form</Text>

      <div style={{ width: '50%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Input
          label="Client ID"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="App Name"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="Logo URL"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="TNC Link"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="App URL - Dev"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="App URL - Stage"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Input
          label="App URL - Prod"
          onChange={({ target: { value } }) => { setEmail(value) }}
          value={email}
          type="text"
          clearable={true}
        />
        <Checkbox
          label="Is Disabled"
          checked={isAdmin}
          onChange={(checked) => setIsAdmin(checked)}
        />
        <Checkbox
          label="Allow Registration"
          checked={isAdmin}
          onChange={(checked) => setIsAdmin(checked)}
        />
        <Button type={ButtonType.Primary} label="Save" />
      </div>
    </Layout>
  )
}

export default AppForm;