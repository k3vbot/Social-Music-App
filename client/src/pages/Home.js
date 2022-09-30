import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <Card body outline color="success" className="mx-auto my-5" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px120" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-5" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-5" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-5" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card body outline color="success" className="mx-auto my-3" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-3" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-3" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card body outline color="success" className="mx-auto my-3" style={{ width: '12rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Song Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Singer</Card.Subtitle>
                            <Card.Text>
                                Song Data go in here
                            </Card.Text>
                            <Card.Link href="#">Click to play</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;