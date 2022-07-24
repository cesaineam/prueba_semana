import logo from './logo.svg';
import './App.css';
import './Styles.css';
import React from "react";
import axios from "axios";


import { List, Button, Card, Row, Col, Space, Spin, message, Select, Tooltip, Typography, Option } from "antd";
import { LoadingOutlined, LikeOutlined, TagOutlined, FilterOutlined } from "@ant-design/icons";




function App() {

  const { Title } = Typography;
  const { Option } = Select;
  const [dataPosts, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [filterTags, setfilterTags] = React.useState([]);
  const [searched, setSearched] = React.useState([]);
  const [dataFilter, setDataFilter] = React.useState([]);


  const filterPosts = () => {
    let auxPosts = []
    if (filterTags.length != 0) {
      Object.keys(dataPosts).map((key) => {

        for (let i = 0; i < dataPosts[key].tags.length; i++) {
          if (filterTags.includes(dataPosts[key].tags[i])) {
            auxPosts.push(dataPosts[key])
          }
        }
      });
      setDataFilter(auxPosts);
    } else {
      console.log("entro a vacio")
      console.log(dataPosts)
      setDataFilter(dataPosts)
    }

  }

  const getList = () => {
    let aux1 = []
    let aux2 = []

    Object.keys(dataPosts).map((key) => {

      for (let i = 0; i < dataPosts[key].tags.length; i++) {
        aux1.push(dataPosts[key].tags[i]);
      }
    }

    );

    let result = aux1.filter((item, index) => {
      return aux1.indexOf(item) === index;
    })
    for (let i = 0; i < result.length; i++) {
      aux2.push(<Option key={result[i]}>{result[i]}</Option>);
    }
    setSearched(aux2);

  }

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 75, color: "#4E75B5" }} spin />
  );




  async function getData1() {

    try {


      const requestOptions = {
        method: 'GET',
        headers: { 'app-id': '62d89574022782cbfba87466' },

      };
      const response = await fetch(`https://dummyapi.io/data/v1/post`, requestOptions);
      const data = await response.json();
      setData(data.data)



    }

    catch (e) {
      console.log(e);
      message.error("Hubo un problema con la consulta")


    }

    //    return await res.json();
  }



  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );





  const PublicationList = React.memo(
    ({ data }) => (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{

          pageSize: 5,
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        onClick={() => {
          console.log("click en item ")
        }}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[

              <IconText icon={LikeOutlined} text={item.likes} />,
              <IconText icon={TagOutlined} text={item.tags} />,


            ]}
            style={{ borderRadius: 20 }}
            extra={
              <img
                width={272}
                height={273}
                alt="logo"
                src={item.image}
              />
            }
          >
            <List.Item.Meta

              description={<b>{item.text}</b>}
            />
            {item.content}
          </List.Item>
        )}
      />
    )
  );

  React.useEffect(() => {
    //if(auth.user){
    getData1()
      .then(() => {
        // console.log("HEADER TOPICS", res.data.topics)
        setDataFilter(dataPosts);
        setLoading(true)
        getList()

      })
      .catch((error) => {
        //message.error("Ocurrio un problema realizando la solicitud");

        console.log(error);
      });


    //}

  }, []);


  return (
    <div>

      {!loading && (
        <Row justify="center" gutter={[10, 10]} align="middle" >
          <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
            <Spin indicator={antIcon} />
          </Col>
        </Row>
      )}
      {loading && (
        <>
          {
            console.log("Searched", searched)}
          <header className="jumbotron">
            <div className="container">
              <div className="row row-header">
                <div className="col-12 col-sm-6">
                  <Title level={3} style={{ color: 'white', textAlign: 'center' }}>Blog de presentación</Title>

                </div>
                <div className="col-12 col-sm-3 align-self-center">

                </div>
                <div className="col-12 col-sm align-self-center">
                  <a role="button" className="btn btn-info" href="https://www.linkedin.com/in/cristian-esteban-sainea-martinez-7011561b7/">Linkedin Cristian Sainea </a>
                </div>
              </div>
            </div>
          </header>
          <Row>

          </Row>
          <Row justify="center">
            <Col span={22}>
              <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <Tooltip title="Aqui podras ajustar los filtros para las publicaciones ">
                  <Card
                    title={<Title level={3} style={{ color: 'white', textAlign: 'center' }}>Filtros</Title>}
                    hoverable

                    headStyle={{ backgroundColor: '#25375d', border: 0 }}

                  >
                    <Row justify='center'>
                      <Col span={18}>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{
                            width: '100%',
                          }}
                          placeholder="Seleccione tag"

                          onChange={(value) => {
                            setfilterTags(value)
                          }}
                        >


                          {searched}
                        </Select>
                      </Col>
                      <Col span={6} >
                        <Button onClick={filterPosts} style={{ marginLeft: 10, color: 'white', backgroundColor: '#25375d' }} icon={<FilterOutlined />}>Filtrar</Button>
                      </Col>
                    </Row>

                  </Card>
                </Tooltip>
                <PublicationList data={dataFilter}></PublicationList>
              </Space>
              <Row justify="center">



              </Row>
            </Col>

          </Row>

        </>
      )}




    </div>

  );
}

export default App;



