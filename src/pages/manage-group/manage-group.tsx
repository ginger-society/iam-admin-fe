import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Checkbox, ConfirmationButton, Input, SnackbarTimer, Text, TextSize, useSnackbar } from "@ginger-society/ginger-ui";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './manageGroups.module.scss';
import { IAMService } from "@/services";
import router from "@/shared/router";
import { FaSearch } from "react-icons/fa";



const ManageGroup = () => {
  const { show } = useSnackbar();

  const [searchTxt, setSearchTxt] = useState<string>()
  const { id } = useParams<{ id: string }>()

  const paths: BreadcrumbItem[] = [
    { path: '/users', label: 'Home' },
    { path: '/manage-group', label: 'Manage Groups' },
  ]

  const members = useMemo(() => {

    if (id) {
      return [
        { emailId: 'email@server.com', isAdmin: false },
        { emailId: 'email@server.com', isAdmin: false },
        { emailId: 'email@server.com', isAdmin: true },
        { emailId: 'email@server.com', isAdmin: false },
        { emailId: 'email@server.com', isAdmin: false },
      ]
    }
  }, [id])

  const removeMember = async (userId: string) => {
    if (!id) {
      return;
    }
    await IAMService.identityManageMembership({
      groupIdentifier: id,
      userId: userId,
      action: "remove",
    });
    show(`User removed : ${userId}`, SnackbarTimer.Medium);
    // fetchUsers();
  };

  const updateMembership = async (userId: string, actionType: string) => {

    if (!id) {
      return;
    }

    try {
      await IAMService.identityManageMembership({
        groupIdentifier: id,
        userId: userId,
        action: "remove",
      });
      await IAMService.identityManageMembership({
        groupIdentifier: id,
        userId: userId,
        action: actionType,
      });
      show(
        `Membership for ${userId} updated successfully`,
        SnackbarTimer.Medium
      );
    } catch (error) {
      console.log(error);
    }
    // fetchUsers();
  };

  const searchForGroup = () => {
    if (searchTxt) {
      router.navigate(`/manage-group/${searchTxt}`)
    }
  }

  const searchForMember = () => {

  };

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Manage Group</Text>

      <div style={{ width: '50%' }}>
        <Input
          label="Search Member"
          onChange={({ target: { value } }) => { setSearchTxt(value) }}
          placeholder="Search for a member using name or email ID"
          value={searchTxt}
          type="text"
          clearable={false}
          endEnhancer={<FaSearch onClick={searchForMember} />}
        />

      </div>


      {id && members && members.map((member) => {
        return (
          <div className={styles["member-container"]}>
            <Text>
              {member.emailId} ({member.isAdmin ? "Admin" : "Member"})
            </Text>
            <ConfirmationButton
              label={"Remove"}
              onClick={() => removeMember(member.emailId)}
              title="Are you sure ?"
              description="This is not reversible"
              confirmButtonLabel="Yes, I am sure"
              okBtnType={ButtonType.Danger}
            ></ConfirmationButton>
            {member.isAdmin ? (
              <Button
                label="Change to a member"
                onClick={() =>
                  updateMembership(member.emailId, "add-member")
                }
              />
            ) : (
              <Button
                label="Change to admin"
                onClick={() =>
                  updateMembership(member.emailId, "add-admin")
                }
              />
            )}
          </div>
        )
      })}
    </Layout>
  )
}

export default ManageGroup;