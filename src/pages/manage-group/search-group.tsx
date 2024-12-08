import Layout from "@/shared/Layout";
import router from "@/shared/router";
import { BreadcrumbItem, Button, ButtonSize, Input, Text, TextSize } from "@ginger-society/ginger-ui";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";


const paths: BreadcrumbItem[] = [
  { path: '/', label: 'Home' },
  { path: '/manage-group', label: 'Search Groups' },
]

const SearchGroup = () => {
  const [searchTxt, setSearchTxt] = useState<string>()

  const handleSearch = () => {
    if (searchTxt) {
      router.navigate(`/manage-group/${searchTxt}`)
    }
  }

  return <>
    <Layout breadcrumbConfig={paths}>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <Text size={TextSize.Large} tag="h2">Search for group</Text>
        <div style={{ width: '50%' }}>
          <Input
            onChange={({ target: { value } }) => { setSearchTxt(value) }}
            placeholder="Search for a group using its uuid"
            value={searchTxt}
            type="text"
            clearable={false}
          />
        </div>
        <Button size={ButtonSize.Large} onClick={handleSearch} label={<>Search <FaSearch /></>} />
      </div>
    </Layout>
  </>
}

export default SearchGroup;