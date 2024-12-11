import { IAMAdminService } from "@/services";
import Layout from "@/shared/Layout";
import router from "@/shared/router";
import { BreadcrumbItem, Button, ButtonSize, Input, Text, TextColor, TextSize } from "@ginger-society/ginger-ui";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";


const paths: BreadcrumbItem[] = [
  { path: '/users', label: 'Home' },
  { path: '/manage-group', label: 'Search Groups' },
]

const SearchGroup = () => {
  const [searchTxt, setSearchTxt] = useState<string>()
  const [errorTxt, setErrorTxt] = useState<string>()

  const handleSearch = async () => {
    if (searchTxt) {
      const exist = await IAMAdminService.adminCheckGroupExists({ uuid: searchTxt })
      if (exist) {
        router.navigate(`/manage-group/${searchTxt}`)
      } else {
        setErrorTxt(`Group ${searchTxt} does not exist`);
      }
    }
  }

  return <>
    <Layout breadcrumbConfig={paths}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <Text size={TextSize.Large} tag="h2">Search for group</Text>
        <div style={{ width: '50%' }}>
          <Input
            onChange={({ target: { value } }) => {
              setErrorTxt('')
              setSearchTxt(value)
            }}
            placeholder="Search for a group using its uuid"
            value={searchTxt}
            type="text"
            clearable={false}
          />
        </div>
        <Button size={ButtonSize.Large} onClick={handleSearch} label={<>Search <FaSearch /></>} />

        <Text color={TextColor.Danger}>{errorTxt}</Text>
      </div>
    </Layout>
  </>
}

export default SearchGroup;