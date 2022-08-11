const url = new URL(location.href);
const current = url.pathname;

// assignment
if (current.endsWith('index.html') || current.endsWith('/')) {
  // courses 選單選擇與收合
  Array.from(document.querySelectorAll('#courses-list li')).forEach(item => {
    item.addEventListener('click', function () {
      document.querySelector('#courses-btn').innerHTML = `${this.innerText}<span class="material-symbols-outlined text-success">expand_more</span>`;
      document.querySelector('#courses').checked = false;
    })
  })

  // category 選單選擇與收合
  Array.from(document.querySelectorAll('#category-list li')).forEach(item => {
    item.addEventListener('click', function () {
      document.querySelector('#category-btn').innerHTML = `${this.innerText}<span class="material-symbols-outlined text-success">expand_more</span>`;
      document.querySelector('#category').checked = false;
    })
  })

  // 點擊選單以外區域關閉選單
  document.querySelector('#courses').addEventListener('change', function () {
    if (this.checked) {
      // 監聽點擊
      document.addEventListener("click", function (e) {
        // 點擊元素不包含在選單的子代內且不等於 label 時收合選單
        // 點擊在 arrow icon 上時會判定為不等於 label，所以 icon 要加入 point-events: none;
        if (!document.querySelector('#courses').contains(e.target) && document.querySelector('#courses-btn') !== e.target) {
          document.querySelector('#courses').checked = false;
        }
      })
    }
  })

  // 點擊選單以外區域關閉選單
  document.querySelector('#category').addEventListener('change', function () {
    if (this.checked) {
      // 監聽點擊
      document.addEventListener("click", function (e) {
        // 點擊元素不包含在選單的子代內且不等於 label 時收合選單
        // 點擊在 arrow icon 上時會判定為不等於 label，所以 icon 要加入 point-events: none;
        if (!document.querySelector('#category').contains(e.target) && document.querySelector('#category-btn') !== e.target) {
          document.querySelector('#category').checked = false;
        }
      })
    }
  })

  document.querySelector('#show-reply').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.assignment-operate').classList.remove('show');
    document.querySelector('.assignment-reply').classList.add('show');
    document.querySelector('.assignment-footer').classList.add('d-none');
    document.querySelector('.assignment').classList.add('show-reply');

    // scrollbar 置底
    document.querySelector('.assignment').scrollTop = document.querySelector('.assignment').scrollHeight;
  });

  document.querySelector('#cancel').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.assignment-operate').classList.add('show');
    document.querySelector('.assignment-reply').classList.remove('show');
    document.querySelector('.assignment-footer').classList.remove('d-none');
    document.querySelector('.assignment').classList.remove('show-reply');
    document.querySelector('.assignment').scrollTop = document.querySelector('.assignment').scrollHeight;
  });
}

// admin
// 第一次開啟判定
let detailFirstOpen = true;
let editFirstOpen = true;
let addFirstOpen = true;

if (current.endsWith('admin.html')) {
  let admin = [
    {
      id: 1,
      identity: 'Admin',
      name: 'Emir Wicks',
      email: 'emir.wicks@mail.com',
      verified: true,
      verifiedTime: '2022/2/18',
      accessCustom: {
        lecture: false,
        coupon: true,
        message: false,
        setting: false,
        taskMenu: true
      }
    },
    {
      id: 2,
      identity: 'Visitor',
      name: 'Zaina Goldsmith',
      email: 'zaina.goldsmith@mail.com',
      verified: false,
      verifiedTime: null,
      accessCustom: {
        lecture: true,
        coupon: true,
        message: false,
        setting: false,
        taskMenu: false
      }
    },
    {
      id: 3,
      identity: 'Admin',
      name: 'Mahima Lopez',
      email: 'mahima.lopez@mail.com',
      verified: true,
      verifiedTime: '2022/3/12',
      accessCustom: {
        lecture: false,
        coupon: false,
        message: false,
        setting: false,
        taskMenu: true
      }
    },
    {
      id: 4,
      identity: 'Admin',
      name: 'Pharrell Murray',
      email: 'pharrell.murray@mail.com',
      verified: true,
      verifiedTime: '2022/3/14',
      accessCustom: {
        lecture: true,
        coupon: true,
        message: true,
        setting: false,
        taskMenu: true
      }
    },
    {
      id: 5,
      identity: 'Visitor',
      name: 'Annika Mcbride',
      email: 'annika.mcbride@mail.com',
      verified: true,
      verifiedTime: '2022/3/29',
      accessCustom: {
        lecture: false,
        coupon: true,
        message: false,
        setting: true,
        taskMenu: true
      }
    },
    {
      id: 6,
      identity: 'Admin',
      name: 'Fatimah Clark',
      email: 'fatimah.clark@mail.com',
      verified: true,
      verifiedTime: '2022/4/2',
      accessCustom: {
        lecture: false,
        coupon: true,
        message: false,
        setting: false,
        taskMenu: false
      }
    },
    {
      id: 7,
      identity: 'Visitor',
      name: 'Klaudia Rhodes',
      email: 'klaudia.rhodes@mail.com',
      verified: false,
      verifiedTime: null,
      accessCustom: {
        lecture: false,
        coupon: true,
        message: true,
        setting: true,
        taskMenu: true
      }
    },
    {
      id: 8,
      identity: 'Visitor',
      name: 'Tillie Lucero',
      email: 'tillie.lucero@mail.com',
      verified: true,
      verifiedTime: '2022/4/16',
      accessCustom: {
        lecture: true,
        coupon: false,
        message: false,
        setting: false,
        taskMenu: true
      }
    },
    {
      id: 9,
      identity: 'Admin',
      name: 'Sabrina Stephenson',
      email: 'sabrina.stephenson@mail.com',
      verified: true,
      verifiedTime: '2022/5/1',
      accessCustom: {
        lecture: false,
        coupon: false,
        message: false,
        setting: true,
        taskMenu: true
      }
    },
    {
      id: 10,
      identity: 'Admin',
      name: 'Annie Smith',
      email: 'annie.smith@mail.com',
      verified: true,
      verifiedTime: '2022/5/20',
      accessCustom: {
        lecture: true,
        coupon: true,
        message: false,
        setting: true,
        taskMenu: false
      }
    },
  ];

  function updateTable() {
    let template = '';

    admin.forEach(item => {
      template +=
        `
    <tr>
      <td>#${item.id}</td>
      <td>${item.name}</td>
      <td>${item.email}</td>
      <td>${item.verified ? 'Yes' : 'No'}</td>
      <td>
        <span class="material-symbols-outlined me-6 visibility" data-id="${item.id}">visibility</span>
        <span class="material-symbols-outlined edit" data-id="${item.id}">edit</span>
      </td>
    </tr>
    `
    })

    document.querySelector('tbody').innerHTML = template;

    // 詳細資訊
    Array.from(document.querySelectorAll('.visibility')).forEach(element => {
      element.addEventListener('click', function () {
        let id = this.getAttribute('data-id');
        const info = admin.filter(item => item.id === Number(id))[0];

        if (detailFirstOpen) {
          document.querySelector('.admin-detail .close-btn').addEventListener('click', closeView);
          document.querySelector('.admin-detail-verify .more').addEventListener('click', toggleMore);
        }

        document.querySelector('#detail-deactivate').addEventListener('click', deleteAdmin);

        //有綁參數，只載入一次會綁死
        document.querySelector('.admin-detail #edit').addEventListener('click', toggleView);

        // 寫入資料
        if (id != 1) {
          document.querySelector('.admin-detail img').setAttribute('src', `https://picsum.photos/200/200/?random=${Math.ceil(Math.random() * 10)}`);
        }
        document.querySelector('.admin-detail img').setAttribute('alt', `${info.name}`);
        document.querySelector('.admin-detail-id').innerText = `#${info.id}`;
        document.querySelector('.admin-detail-identity').innerText = `${info.identity}`;
        document.querySelector('.admin-detail-name').innerText = `${info.name}`;
        document.querySelector('.admin-detail-email').innerText = `${info.email}`;
        document.querySelector('.admin-detail-verify .tag').innerText = `${info.verified ? 'Verified' : 'Unverified'}`;

        document.querySelector('.mask').classList.add('show');
        document.querySelector('.admin-detail').classList.add('show');

        function toggleMore() {
          document.querySelector('.admin-detail-verify').classList.toggle('open');
        }

        function deleteAdmin() {
          let currentIndex = 0;
          for (let i = 0; i <= admin.length; i++) {
            if (admin[i].id === info.id) {
              currentIndex = i;
              break;
            }
          }

          admin.splice(currentIndex, 1);
          updateTable();
          closeView();
        }

        function toggleView() {
          document.querySelector('.admin-detail').classList.remove('show');
          showEdit(id);
        }

        function closeView() {
          document.querySelector('.mask').classList.remove('show');
          document.querySelector('.admin-detail').classList.remove('show');
          document.querySelector('.admin-detail #edit').removeEventListener('click', toggleView);
          document.querySelector('#detail-deactivate').removeEventListener('click', deleteAdmin);
        }

        detailFirstOpen = false;
      })
    })

    // 編輯頁
    Array.from(document.querySelectorAll('.edit')).forEach(element => element.addEventListener('click',
      function () {
        let id = Number(arguments[0]) > 0 ? arguments[0] : this.getAttribute('data-id');
        const info = admin.filter(item => item.id === Number(id))[0];
        const currentView = document.querySelector('[data-role="edit"]');

        currentView.querySelector('.close-btn').addEventListener('click', closeView);
        currentView.querySelector('.access').addEventListener('click', openList);
        currentView.querySelector('#cancel').addEventListener('click', closeView);
        currentView.querySelector('#submit').addEventListener('click', updateAdmin);
        currentView.querySelector("#deactivate").addEventListener('click', deleteAdmin);

        // access 選單控制
        // 只在第一次開啟時加入監聽
        if (editFirstOpen) {
          Array.from(currentView.querySelectorAll('.access-list li')).forEach(item => {
            item.addEventListener('click', function (e) {
              e.stopPropagation();
              currentView.querySelector('.identity').innerText = `${this.innerText}`;
              currentView.querySelector('.access-list').classList.toggle('open');
            });
          })
        }

        // 寫入資料;
        currentView.querySelector('#name').value = `${info.name}`;
        currentView.querySelector('#email').value = `${info.email}`;
        currentView.querySelector('.identity').innerText = `${info.identity}`;
        if (info.verified) {
          currentView.querySelector('.verified').innerHTML = `<span class="material-symbols-outlined me-2  text-success">check_circle</span>Verified`;
          currentView.querySelector('.verifiedTime').classList.remove('d-none');
          currentView.querySelector('.verifiedTime').innerText = `${info.verifiedTime}`;
          currentView.querySelector('#send-mail').classList.remove('disabled');
        } else {
          currentView.querySelector('.verified').innerHTML = `<span class="material-symbols-outlined me-2 text-danger">warning</span>Unverified`;
          currentView.querySelector('.verifiedTime').classList.add('d-none');
          currentView.querySelector('#send-mail').classList.add('disabled');
        }
        Object.entries(info.accessCustom).forEach(item => {
          if(item[1]) {
            currentView.querySelector(`#${item[0]}`).checked = true;
          } else {
            currentView.querySelector(`#${item[0]}`).checked = false;
          }
        })

        document.querySelector('.mask').classList.add('show');
        currentView.classList.add('show');

        // scrollbar 置頂
        currentView.querySelector('form').scrollTop = 0;

        function openList() {
          currentView.querySelector('.access-list').classList.toggle('open');
        }

        function updateAdmin() {
          let currentIndex = 0;
          for (let i = 0; i <= admin.length; i++) {
            if (admin[i].id === info.id) {
              currentIndex = i;
              break;
            }
          }

          admin[currentIndex].name = currentView.querySelector('#name').value;
          admin[currentIndex].email = currentView.querySelector('#email').value;
          admin[currentIndex].identity = currentView.querySelector('.identity').innerText;

          updateTable();
          closeView();
        }

        function deleteAdmin() {
          let currentIndex = 0;
          for (let i = 0; i <= admin.length; i++) {
            if (admin[i].id === info.id) {
              currentIndex = i;
              break;
            }
          }

          admin.splice(currentIndex, 1);
          updateTable();
          closeView();
        }

        function closeView() {
          document.querySelector('.mask').classList.remove('show');
          currentView.classList.remove('show');

          // 移除監聽，減少不必要的效能損耗
          currentView.querySelector('.close-btn').removeEventListener('click', closeView);
          currentView.querySelector('.access').removeEventListener('click', openList);
          currentView.querySelector('#cancel').removeEventListener('click', closeView);
          currentView.querySelector('#submit').removeEventListener('click', updateAdmin);
          currentView.querySelector('#deactivate').removeEventListener('click', deleteAdmin);
        }

        editFirstOpen = false;
      }));

    // 新增頁
    document.querySelector('.admin-add').addEventListener('click', function (e) {
      e.preventDefault();
      const currentView = document.querySelector('[data-role="add"]');

      if (addFirstOpen) {
        currentView.querySelector('.close-btn').addEventListener('click', closeView);
        currentView.querySelector('.access').addEventListener('click', openList);
        currentView.querySelector('#cancel').addEventListener('click', closeView);
        currentView.querySelector('#submit').addEventListener('click', newAdmin);

        Array.from(currentView.querySelectorAll('.access-list li')).forEach(item => {
          item.addEventListener('click', function (e) {
            e.stopPropagation();
            currentView.querySelector('.identity').innerText = `${this.innerText}`;
            currentView.querySelector('.access-list').classList.toggle('open');
          })
        })
      }

      document.querySelector('.mask').classList.add('show');
      currentView.classList.add('show');

      // scrollbar 置頂
      currentView.querySelector('form').scrollTop = 0;

      function openList() {
        currentView.querySelector('.access-list').classList.toggle('open');
      }

      function newAdmin() {
        const newAdmin = {};
        newAdmin.id = admin.length - 1 > 0 ? Number(admin[admin.length - 1].id) + 1 : 1;
        newAdmin.identity = currentView.querySelector('.identity').innerText;
        newAdmin.name = currentView.querySelector('#a-name').value;
        newAdmin.email = currentView.querySelector('#a-email').value;
        newAdmin.verified = false;
        newAdmin.verifiedTime = null;
        newAdmin.accessCustom = {
          lecture: currentView.querySelector('#a-lecture').checked,
          coupon: currentView.querySelector('#a-coupon').checked,
          message: currentView.querySelector('#a-message').checked,
          setting: currentView.querySelector('#a-setting').checked,
          taskMenu: currentView.querySelector('#a-taskMenu').checked,
        };

        admin.push(newAdmin);

        updateTable();
        closeView();
      }

      function closeView() {
        document.querySelector('.mask').classList.remove('show');
        currentView.classList.remove('show');

        // 表單初始化
        currentView.querySelector('#a-name').value = '';
        currentView.querySelector('#a-email').value = '';
        currentView.querySelector('.identity').innerText = '-Choose access level-';
        Array.from(currentView.querySelectorAll('.access-custom [type="checkbox"]')).forEach(item => {
          item.checked = false;
        })
      }

      addFirstOpen = false;
    })
  };

  updateTable();
}
