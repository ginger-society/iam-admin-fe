import Layout from "@/shared/Layout";
import router from "@/shared/router";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Pagination, Table, Text, TextSize, ButtonSize } from "@ginger-society/ginger-ui";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const paths: BreadcrumbItem[] = [
  { path: '/', label: 'Home' },
  { path: '/apps', label: 'Apps' },
];

const AppsList = () => {
  const [state, setState] = useState<{ offset: number; limit: number }>({
    offset: 19,
    limit: 10
  });

  const [searchTxt, setSearchTxt] = useState<string>();

  const handleOnChange = (limit: number, offset: number) => {
    setState({ offset, limit });
  };

  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Apps</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '50%' }}>
          <Input
            onChange={({ target: { value } }) => { setSearchTxt(value); }}
            placeholder="Search..."
            value={searchTxt}
            type="text"
            clearable={true}
          />
        </div>
        <Table>
          <thead>
            <tr>
              <th scope="col">Client id
                <br />Name
              </th>
              <th scope="col">Disabled</th>
              <th scope="col">URLs</th>
              <th scope="col">Manage Users</th>
              <th scope="col">Allow registration</th>
            </tr>
          </thead>
          <tbody>
            <tr onClick={() => {router.navigate('/apps/edit/1')}}>
              <td>iam-admin-staging <br />IAM Admin <br /> <img width={60} src="https://www.gingersociety.org/img/ginger_icon.png" alt="Logo" /></td>
              <td>No</td>
              <td style={{fontSize: '14px'}}>
                Dev: http://localhost:3003/#/handle-auth/ <br />
                Stage : https://iam-admin-staging.gingersociety.org/handle-auth/ <br />
                Prod : https://iam-admin.gingersociety.org/handle-auth/
              </td>
              <td><Button label="Manage"></Button></td>
              <td>No</td>
            </tr>
            <tr>
              <td>db-compose-test-env <br /> DB Compose Test Env <br /> <img width={60} src="https://www.gingersociety.org/img/ginger_icon.png" alt="Logo" /></td>
              <td>No</td>
              <td style={{fontSize: '14px'}}>
                Dev: http://localhost:3013/handle-auth/ <br />
                Stage: https://db-compose-runtime-test-env-675766508318.asia-south1.run.app/handle-auth/
              </td>
              <td><Button label="Manage" onClick={(e) => {router.navigate('/manage-group/id');e?.stopPropagation()}}></Button></td>
              <td>Yes <br />
              TnC : https://gingersociety.org/terms-of-use
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </Table>
        <Pagination
          totalRows={1100}
          initialRowsPerPage={state.limit}
          initialOffset={state.offset}
          onChange={handleOnChange}
        />
      </div>
    </Layout>
  );
};

export default AppsList;
