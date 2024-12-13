import { IAMAdminService } from "@/services";
import { UserResponse } from "@/services/IAMAdminService_client";
import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, SnackbarTimer, Text, TextColor, TextSize, useSnackbar } from "@ginger-society/ginger-ui";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";




const UserForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("")
  const [middleName, setMiddleName] = useState<string>()
  const [lastName, setLastName] = useState<string>("")
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [actionDisabled, setActionDisabled] = useState<boolean>(false)

  const { show } = useSnackbar();

  const handleSaveOrCreate = async () => {
    if (id) {
      setLoading(true);
      const savedResponse = await IAMAdminService.adminUpdateUserByEmail({ updateUserRequest: { isActive, firstName, lastName, middleName, isRoot: isAdmin }, email: id })
      setLoading(false);
    } else {
      const inviteResponse = await IAMAdminService.adminCreateInvite({ inviteRequest: { firstName, middleName, lastName, emailId: email, isRoot: isAdmin } })
      show("Invite sent successfully", SnackbarTimer.Medium)
      setFirstName("");
      setMiddleName(undefined);
      setLastName("");
      setIsActive(false);
      setIsAdmin(false);
      setEmail("");
    }
  }

  const fetchUserData = useCallback(async () => {
    if (!id) {
      return;
    }
    const data = await IAMAdminService.adminGetUserByEmail({ email: id })
    setFirstName(data.firstName || "");
    setMiddleName(data.middleName || undefined);
    setLastName(data.lastName || "");
    setIsActive(data.isActive);
    setIsAdmin(data.isRoot);
    setEmail(data.emailId);
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

  const checkEmail = async () => {
    const exist = await IAMAdminService.adminCheckUserExists({ email })
    if (exist) {
      setEmailError('The email already exist or is invalid');
      setActionDisabled(true)
    } else {
      setEmailError("");
      setActionDisabled(false)
    }
  }

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>User form</Text>

      <div style={{ width: '50%', display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <Input
          disabled={!!id}
          label="Email ID"
          value={email}
          onChange={({ target: { value } }) => { setEmail(value) }}
          type="text"
          onBlur={checkEmail}
        />
        {emailError && <Text color={TextColor.Danger}>{emailError}</Text>}
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
        <Button type={ButtonType.Primary} label={!id ? 'Create and Send Invite' : 'Save'} loading={loading} disabled={actionDisabled} onClick={handleSaveOrCreate} />
      </div>
    </Layout>
  )
}

export default UserForm;