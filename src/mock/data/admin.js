import Mock from 'mockjs';

const Admins = [];

for (let i = 0; i < 80; i++) {
  Admins.push(Mock.mock({
    id: i+1,
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    email: Mock.Random.email(),
    amount: Math.floor(Math.random()*1000),
    builder: Mock.Random.cname(),
    buildtime: Mock.Random.date(),
    image: Mock.Random.image("120x50")
  }));
}

export { Admins };
