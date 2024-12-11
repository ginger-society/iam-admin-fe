import { IAMAdminService } from "@/services";
import { UserResponse } from "@/services/IAMAdminService_client";
import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Text, TextSize } from "@ginger-society/ginger-ui";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";




const UserForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>()
  const [middleName, setMiddleName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserResponse>();

  const handleSaveOrCreate = async () => {
    if (id) {
      setLoading(true);
      const savedResponse = await IAMAdminService.adminUpdateUserByEmail({ updateUserRequest: { isActive, firstName, lastName, middleName, isRoot: isAdmin }, email: id })
      setLoading(false);
    }
  }

  const fetchUserData = useCallback(async () => {
    if (!id) {
      return;
    }
    const data = await IAMAdminService.adminGetUserByEmail({ email: id })
    setFirstName(data.firstName || undefined);
    setMiddleName(data.middleName || undefined);
    setLastName(data.lastName || undefined);
    setIsActive(data.isActive);
    setIsAdmin(data.isRoot);
    setUserData(data);
  }, [id]);

  const paths: BreadcrumbItem[] = useMemo(() => {

    if (id) {
      fetchUserData();
    }

    return [
      { path: '/users', label: 'Home' },
      { path: '/users', label: 'Users' },
      { path: '', label: id ? `Editing : ${id}` : 'Creating new' },
    ]
  }, [id, fetchUserData])

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>User form</Text>

      <div style={{ width: '50%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Input
          disabled={!!id}
          label="Email ID"
          value={id}
          type="text"
        />
        <Input
          label="First Name"
          onChange={({ target: { value } }) => { setFirstName(value) }}
          value={firstName}
          type="text"
          clearable={true}
        />
        <Input
          label="Middle Name"
          onChange={({ target: { value } }) => { setMiddleName(value) }}
          value={middleName}
          type="text"
          clearable={true}
        />
        <Input
          label="Last Name"
          onChange={({ target: { value } }) => { setLastName(value) }}
          value={lastName}
          type="text"
          clearable={true}
        />
        <Checkbox
          label="Is Admin"
          checked={isAdmin}
          onChange={(checked) => setIsAdmin(checked)}
        />
        {id && <Checkbox
          label="Is Active"
          checked={isActive}
          onChange={(checked) => setIsActive(checked)}
        />}
        <Button type={ButtonType.Primary} label={!id ? 'Create and Send Invite' : 'Save'} loading={loading} onClick={handleSaveOrCreate} />
      </div>
    </Layout>
  )
}

export default UserForm;