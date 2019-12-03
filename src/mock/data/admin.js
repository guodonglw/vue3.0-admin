import Mock from 'mockjs';

var Admins = [];

for (let i = 0; i < 80; i++) {
  Admins.push(Mock.mock({
    id: i+1,
    name: Mock.Random.cname(),
    sex: Mock.Random.integer(0, 1),
    addr: Mock.mock('@county(true)'),
    email: Mock.Random.email(),
    amount: Math.floor(Math.random()*1000),
    builder: Mock.Random.cname(),
    buildtime: Mock.Random.date(),
    image: Mock.Random.image("120x40")
  }));
}

Admins = Admins.map((item) => {
  item.sex = (item.sex === 1) ? '男' : '女'
  return item
})

export { Admins };
