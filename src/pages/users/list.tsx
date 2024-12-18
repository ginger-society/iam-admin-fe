import { IAMAdminService } from "@/services";
import { UserResponse } from "@/services/IAMAdminService_client";
import Layout from "@/shared/Layout";
import router from "@/shared/router";
import {
  BreadcrumbItem, Button, ButtonType, Input, Pagination, Table, Text, TextSize, ButtonSize
} from "@ginger-society/ginger-ui";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const paths: BreadcrumbItem[] = [
  { path: '/users', label: 'Home' },
  { path: '/users', label: 'Users' },
];

const UsersList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserResponse[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [state, setState] = useState<{ offset: number; limit: number }>({
    offset: 0,
    limit: 10,
  });

  const [searchTxt, setSearchTxt] = useState<string>("");

  const handleOnChange = (limit: number, offset: number) => {
    setState({ offset, limit });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const page = Math.floor(state.offset / state.limit) + 1;
      const pageSize = state.limit;

      const response = await IAMAdminService.adminGetPaginatedUsers({ page, pageSize, search: searchTxt });
      setData(response.data);
      setTotalRows(response.totalCount || 0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Users</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%' }}>
            <Input
              onChange={({ target: { value } }) => setSearchTxt(value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  fetchData();
                }
              }}
              placeholder="Search..."
              value={searchTxt}
              type="text"
              clearable={true}
            />
          </div>
          <Button
            type={ButtonType.Secondary}
            onClick={() => router.navigate('/users/new')}
            label="Create new user"
          />
        </div>

        {loading && <Text>Loading...</Text>}

        {!loading && <><Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>Active?</th>
              <th>Admin User?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((u) => (
              <tr key={u.emailId} onClick={() => router.navigate(`/users/edit/${u.emailId}`)}>
                <td>{u.firstName || 'NA'}</td>
                <td>{u.emailId}</td>
                <td>{u.isActive ? 'Yes' : 'No'}</td>
                <td>{u.isRoot ? 'Yes' : 'No'}</td>
                <td>
                  <Button
                    endEnhancer={<FaArrowRight />}
                    size={ButtonSize.Small}
                    type={ButtonType.Tertiary}
                    label="View"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
          <Pagination
            totalRows={totalRows}
            initialRowsPerPage={state.limit}
            initialOffset={state.offset}
            onChange={handleOnChange}
          /></>}
      </div>
    </Layout>
  );
};

export default UsersList;
