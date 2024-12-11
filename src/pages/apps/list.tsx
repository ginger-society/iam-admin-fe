import { IAMAdminService } from "@/services";
import { AppResponse } from "@/services/IAMAdminService_client";
import Layout from "@/shared/Layout";
import router from "@/shared/router";
import {
  BreadcrumbItem, Button, Input, Pagination, Table, Text, TextSize
} from "@ginger-society/ginger-ui";
import { useCallback, useEffect, useState } from "react";

const paths: BreadcrumbItem[] = [
  { path: '/apps', label: 'Home' },
  { path: '/apps', label: 'Apps' },
];

const AppsList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AppResponse[]>([]);
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

      const response = await IAMAdminService.adminListPaginatedApplications({
        page,
        pageSize,
        search: searchTxt,
      });

      setData(response.data);
      setTotalRows(response.totalCount || 0);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Apps</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '50%' }}>
            <Input
              onChange={({ target: { value } }) => setSearchTxt(value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  fetchData(); // Fetch data only when Enter is pressed
                }
              }}
              placeholder="Search..."
              value={searchTxt}
              type="text"
              clearable={true}
            />
          </div>
        </div>

        {loading && <Text>Loading...</Text>}

        {!loading && (
          <>
            <Table>
              <thead>
                <tr>
                  <th>Client ID<br />Name</th>
                  <th>Disabled</th>
                  <th>Allow Registration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {app.logoUrl && <img width={60} src={app.logoUrl} alt={`${app.name} Logo`} />}
                        <Text size={TextSize.Large}>{app.name}</Text><br />
                      </div>
                      ID : {app.clientId}
                    </td>
                    <td>{app.disabled ? 'Yes' : 'No'}</td>
                    <td>
                      {app.allowRegistration ? 'Yes' : 'No'}
                      {app.tncLink && (
                        <>
                          <br />TnC: <a href={app.tncLink} target="_blank" rel="noopener noreferrer">{app.tncLink}</a>
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        label="Manage Access"
                        onClick={() => {
                          router.navigate(`/manage-group/${app.groupId}`);
                        }}
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
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default AppsList;
