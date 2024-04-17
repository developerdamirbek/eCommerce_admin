import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useSearchQuery } from "./service/useGetSearch";
import { Image, List, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

export const Searchbar = ({ api_url }: { api_url: string }) => {
    const [value, setValue] = useState("");
    const search = useDebounce(value);
    const { data, isLoading } = useSearchQuery(search, api_url);
    const navigate = useNavigate()

    const listItem = data?.results

    return (
        <div>
            <div>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

            </div>
            {value.length >= 2 ? (
                <>
                {!data?.results?.length && !isLoading && <h2 style={{textAlign: "center"}}>Category Not Found</h2>}
                    {isLoading ? <Spin style={{width:"100%", display:"flex", justifyContent:"center", marginTop: 30}} /> : (
                        <List
                        itemLayout="horizontal"
                        dataSource={listItem}
                        renderItem={(item: {id: number, image: string, title:string}) => (
                          <List.Item style={{cursor: "pointer"}} onClick={() => navigate(`/app/${api_url}/edit/${item.id}/`)}>
                            <List.Item.Meta
                              avatar={<Image width={60} height={60} style={{objectFit: "cover"}} src={item.image} />}
                              title={item.title}
                            />
                          </List.Item>
                        )}
                      />
                    )}
                </>
            ) : <Typography style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 30, width: "100%" }}>Search Category</Typography>}
        </div>
    )
}
