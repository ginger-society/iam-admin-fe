import Layout from "@/shared/Layout";
import router from "@/shared/router";
import { BreadcrumbItem, Button, ButtonType, Checkbox, Input, Pagination, Table, Text, TextSize, Option, MultiSelect, ButtonSize } from "@ginger-society/ginger-ui";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const paths: BreadcrumbItem[] = [
  { path: '/users', label: 'Home' },
  { path: '/users', label: 'Users' },
];


const UsersList = () => {
  const [state, setState] = useState<{ offset: number; limit: number }>({
    offset: 19,
    limit: 10
  })

  const [searchTxt, setSearchTxt] = useState<string>()

  const handleOnChange = (limit: number, offset: number) => {
    setState({ offset, limit })
  }


  return (
    <Layout breadcrumbConfig={paths}>
      <Text tag="h2" size={TextSize.Large}>Users</Text>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <tr onClick={() => router.navigate(`/users/edit/${1}`)}>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View" onClick={(e) => { router.navigate('/users/manage-groups/1'); e?.stopPropagation() }}></Button></td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>North/South</td>
              <td>Simon Crowther</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Paris spécialités</td>
              <td>Marie Bertrand</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Eastern Connection</td>
              <td>Ann Devon</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
            <tr>
              <td>Rattlesnake Canyon Grocery</td>
              <td>Paula Wilson</td>
              <td>Yes</td>
              <td>No</td>
              <td><Button endEnhancer={<FaArrowRight />} size={ButtonSize.Small} type={ButtonType.Tertiary} label="View"></Button></td>
            </tr>
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
  )
}

export default UsersList;