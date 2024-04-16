import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useSearchQuery } from "./service/useGetSearch";
import { Image, Spin, Typography } from "antd";
import Search from "antd/es/input/Search";

export const Searchbar = ({ api_url }: { api_url: string }) => {
    const [value, setValue] = useState("");
    const search = useDebounce(value);
    const { data, isLoading } = useSearchQuery(search, api_url);
    console.log(data);

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
                        <div>
                            {data?.results?.map((item: any) => (
                                <div style={{ display: "flex" }}>
                                    <Image width={70} src={item.image} />
                                    <Typography >{item.title}</Typography>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : <Typography style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: 30, width: "100%" }}>Search Category</Typography>}
        </div>
    )
}
