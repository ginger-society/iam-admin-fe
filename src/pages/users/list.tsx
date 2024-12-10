import { IAMAdminService } from "@/services";
import { UserResponse } from "@/services/IAMAdminService_client";
import Layout from "@/shared/Layout";
import router from "@/shared/router";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Pagination, Table, Text, TextSize, Option, MultiSelect, ButtonSize } from "@ginger-society/ginger-ui";
import { useEffect, useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const paths: BreadcrumbItem[] = [
  { path: '/users', label: 'Home' },
  { path: '/users', label: 'Users' },
];


const UsersList = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserResponse[]>([])
  const [state, setState] = useState<{ offset: number; limit: number }>({
    offset: 19,
    limit: 10
  })

  const [searchTxt, setSearchTxt] = useState<string>()

  const handleOnChange = (limit: number, offset: number) => {
    setState({ offset, limit })
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const users = await IAMAdminService.adminGetPaginatedUsers({ page: 1, pageSize: 20 })
      console.log(users)
      setData(users.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Users</Text>
      {loading && <Text>Loading...</Text>}
      {!loading && <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%' }}>
            <Input
              onChange={({ target: { value } }) => { setSearchTxt(value) }}
              placeholder="Search..."
              value={searchTxt}
              type="text"
              clearable={true}
            />

          </div>
          <Button type={ButtonType.Secondary} onClick={() => router.navigate('/users/new')} label="Create new user" />
        </div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Active ?</th>
              <th>Admin User ?</th>
              <th>Groups</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u) => {
              return (
                <tr onClick={() => router.navigate(`/users/edit/${u.emailId}`)}>
                  <td>{u.firstName || 'NA'}</td>
                  <td>{u.emailId}</td>
                  <td>{u.isActive ? 'Yes' : 'No'}</td>
                  <td>{u.isRoot ? 'Yes' : 'No'}</td>
                  <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <Pagination
          totalRows={1100}
          initialRowsPerPage={state.limit}
          initialOffset={state.offset}
          onChange={handleOnChange}
        />
      </div>}
    </Layout>
  )
}

export default UsersList;