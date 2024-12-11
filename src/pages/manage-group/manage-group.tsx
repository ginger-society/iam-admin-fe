import Layout from "@/shared/Layout";
import { BreadcrumbItem, Button, ButtonType, Option, ConfirmationButton, Input, SnackbarTimer, Text, TextSize, useSnackbar, Modal, ModalSize, ModalHeader, ModalBody, Select } from "@ginger-society/ginger-ui";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './manageGroups.module.scss';
import { IAMService } from "@/services";
import router from "@/shared/router";
import { FaSearch } from "react-icons/fa";
import { UserInfoResponse } from "@/services/IAMService_client";



const ManageGroup = () => {
  const { show } = useSnackbar();

  const [searchTxt, setSearchTxt] = useState<string>('')
  const { id } = useParams<{ id: string }>()
  const [members, setMembers] = useState<UserInfoResponse[]>([])
  const [userToAdd, setUserToAdd] = useState<string>()
  const [memberTypeToAdd, setMemberTypeToAdd] = useState<Option>({
    value: "add-member",
    label: "Member",
  });
  const [isOpen, setIsOpen] = useState(false);


  const paths: BreadcrumbItem[] = useMemo(() => {
    return [
      { path: '/users', label: 'Home' },
      { path: '/manage-group', label: 'Search Groups' },
      { path: '', label: `Editing group : ${id}` },
    ]
  }, [id])

  const fetchMembers = async () => {
    if (id) {
      const members = await IAMService.identityGetMembers({ groupParam: id })
      setMembers(members);

    }
  }

  useEffect(() => {
    fetchMembers();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const removeMember = async (userId: string) => {
    if (!id) {
      return;
    }
    await IAMService.identityManageMembership({
      groupParam: id,
      userId: userId,
      action: "remove",
    });
    show(`User removed : ${userId}`, SnackbarTimer.Medium);
    fetchMembers();
  };

  const updateMembership = async (userId: string, actionType: string) => {

    if (!id) {
      return;
    }

    try {
      await IAMService.identityManageMembership({
        groupParam: id,
        userId: userId,
        action: "remove",
      });
      await IAMService.identityManageMembership({
        groupParam: id,
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
    fetchMembers();
  };

  const searchForGroup = () => {
    if (searchTxt) {
      router.navigate(`/manage-group/${searchTxt}`)
    }
  }

  const searchForMember = () => {

  };

  const addMember = async () => {
    if (!id || !userToAdd) {
      console.log("Group id or userID not available");
      return;
    }
    try {
      const data = await IAMService.identityManageMembership({
        groupParam: id,
        userId: userToAdd,
        action: memberTypeToAdd.value,
      });
      show("User added successfully", SnackbarTimer.Medium);
      setIsOpen(false);
      setMemberTypeToAdd({ value: "add-member", label: "Member" });
      setUserToAdd(undefined);
      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Manage Group</Text>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

        <div style={{ alignContent: 'end' }}><Button label="Add Member" onClick={() => setIsOpen(true)} /></div>

      </div>


      {id && members && members.filter((m) => m.emailId.includes(searchTxt)).map((member) => {
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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={ModalSize.Large}
      >
        <ModalHeader>Add member</ModalHeader>
        <ModalBody>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Select
              label="Membership type"
              value={memberTypeToAdd}
              options={[
                { label: "Member", value: "add-member" },
                { label: "Admin", value: "add-admin" },
              ]}
              renderer={(option) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  {option.label}
                </div>
              )}
              onChange={(v) => {
                setMemberTypeToAdd(v);
              }}
            />
            <Input
              label="Email ID"
              value={userToAdd}
              onChange={(e) => setUserToAdd(e.target.value)}
            ></Input>
            <div style={{ display: "flex", gap: "20px" }}>
              <Button
                onClick={addMember}
                type={ButtonType.Primary}
                label={"Add"}
              ></Button>
              <Button
                onClick={() => setIsOpen(false)}
                type={ButtonType.Tertiary}
                label={"Cancel"}
              ></Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Layout>
  )
}

export default ManageGroup;