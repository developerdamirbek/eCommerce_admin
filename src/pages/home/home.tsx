// import { Button, Card, Col, Row, Typography } from "antd"
// import { useGetCategory } from "../category/service/query/useGetCategory";
// import { useGetSubcategories } from "../subcategory/service/query/useGetSubcategory";
// import { useGetAttribute } from "../attribute/service/query/useGetAttribute";
// import { useGetBrand } from "../brands/service/query/useGetBrand";
// import { useNavigate } from "react-router-dom";

// const { Title } = Typography;

export const Home = () => {

  // const { data: category } = useGetCategory();
  // const { data: subcategory } = useGetSubcategories();
  // const { data: attribute } = useGetAttribute();
  // const { data: brand } = useGetBrand();

  // const navigate = useNavigate()


  return (
    <div>
      <h1>Dashboard</h1>
      {/* <Title style={{ marginBottom: 30, marginTop: 0 }} level={2}>Admin dashboard</Title>
      <Row style={{ marginBottom: 30 }}>
        <Col span={8}>
          <Card hoverable title="Categoy List" onClick={() => navigate('/app/category')} style={{ width: 370 }}>
            <Title>
              {category?.length}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title="Subcategory List" extra={<a href="#">More</a>} style={{ width: 370 }}>
            <Title>
              {subcategory?.length}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title="Brand List" extra={<a href="#">More</a>} style={{ width: 370 }}>
            <Title>
              {brand?.length}
            </Title>
          </Card>
        </Col>
      </Row>
      <Row> */}
        {/* <Col span={8}>
          <Card hoverable title="Attribute" extra={<a href="#">More</a>} style={{ width: 370 }}>
            <Title>
              {attribute?.results?.length ? (attribute?.results?.length - 1 + `+`) : 0}
            </Title>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title="Attribute Values" extra={<a href="#">More</a>} style={{ width: 370 }}>

          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable title="Product List" extra={<a href="#">More</a>} style={{ width: 370 }}>

          </Card>
        </Col> */}
      {/* </Row> */}
    </div>
  )
}
