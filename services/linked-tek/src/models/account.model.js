const { accountApi } = require('../apis');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
const subscriptionTargetValid = (target) => target && (target === 'Company' || target === 'School');

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.createUser(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.subscribeUser = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.subscribeUser(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.listUserSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.listUserSubscription(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.deleteUserSubscription = (subscriptionData) => {
  return new Promise((resolve, reject) => {
    subscriptionData.target = capitalize(subscriptionData.target);
    if (!subscriptionTargetValid(subscriptionData.target)) {
      reject(`${subscriptionData.target} is not a valid value for target.`);
    } else {
      accountApi.deleteUserSubscription(subscriptionData)
        .then((res) => resolve(res))
        .catch((error) => reject(error));
    }
  });
};

exports.addLeader = (relationData) => {
  return new Promise((resolve, reject) => {
    accountApi.addLeader(relationData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.listLeader = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.listLeader(userData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.deleteLeader = (relationData) => {
  return new Promise((resolve, reject) => {
    accountApi.deleteLeader(relationData)
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

exports.listSuggestion = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.listSuggestion(userData)
      .then(res => {
        const ret = res.records.reduce((accu, record) => {
          const nodes = [record.get('leader'), record.get('entity')];
          nodes.forEach(node => {
            if (!accu.find(item => item.id === node.identity.low)) {
              accu.push(Object.assign({ id: node.identity.low, target: node.labels[0] }, node.properties));
            }
          });
          return accu;
        }, []);
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};

exports.getActualityFeed = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.getActualityFeed(userData) 
      .then(res => {
        const ret = res.records.map(record => {
          const user = record.get('leader');
          const item = record.get('item');

          return {
            user: Object.assign({ id: user.identity.low }, user.properties),
            data: Object.assign({ id: item.identity.low, target: item.labels[0] }, item.properties)
          };
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};

exports.sendMessage = (messageData) => {
  return new Promise((resolve, reject) => {
    accountApi.sendMessage(messageData)
      .then(res => {
        const ret = res.records.map(record => {
          const node = record.get('message');
          return Object.assign({ id: node.identity.low }, node.properties); 
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};

exports.inbox = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.inbox(userData)
      .then(res => {
        const ret = res.records.map(record => {
          const message = record.get('message');
          const sender = record.get('sender');

          const ret = Object.assign({ id: message.identity.low }, message.properties);
          ret.sender = Object.assign({ id: sender.identity.low }, sender.properties);
          return ret;
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};


exports.outbox = (userData) => {
  return new Promise((resolve, reject) => {
    accountApi.outbox(userData)
      .then(res => {
        const ret = res.records.map(record => {
          const message = record.get('message');
          const receiver = record.get('receiver');

          const ret = Object.assign({ id: message.identity.low }, message.properties);
          ret.receiver = Object.assign({ id: receiver.identity.low }, receiver.properties);
          return ret;
        });
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};

exports.patchProfile = (profileData) => {
  return new Promise((resolve, reject) => {
    accountApi.patchProfile(profileData)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.patchProfileCountry = (profileData) => {
  return new Promise((resolve, reject) => {
    accountApi.patchProfileCountry(profileData)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.getProfile = (profileData) => {
  return new Promise((resolve, reject) => {
    accountApi.getProfile(profileData)
      .then(res => {
        const [record] = res.records;
        const user = record.get('user');
        const country = record.get('country');
        const company = record.get('company');
        const job = record.get('job');
        
        const ret = Object.assign(
          { id: user.identity.low }, {
            name: user.properties.name,
            email: user.properties.email,
            age: user.properties.age ? user.properties.age.low : undefined
          });

        if (country) {
          ret.country = Object.assign({ id: country.identity.low }, country.properties);
        }

        if (company) {
          ret.company = Object.assign({ id: company.identity.low }, company.properties);
        }

        if (job) {
          ret.job = { since: job.properties.from, title: job.properties.title };
        }
        resolve(ret);
      })
      .catch(error => reject(error));
  });
};

exports.patchProfileCurrentJob = (profileData) => {
  return new Promise((resolve, reject) => {
    accountApi.patchProfileCurrentJob(profileData)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

exports.addJob = (jobData) => {
  return new Promise((resolve, reject) => {
    accountApi.addJob(jobData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

exports.getJobHistory = (jobData) => {
  return new Promise((resolve, reject) => {
    accountApi.getJobHistory(jobData)
      .then(res => {
        const jobHistory = res.records.map(record => {
          const job = record.get('job');
          const company = record.get('company');
          const ret = {
            job: job.properties,
            company: Object.assign({ id: company.identity.low }, company.properties)
          };
          return ret;
        });
        resolve(jobHistory);
      })
      .catch(error => reject(error));
  });
};

exports.addStudy = (studyData) => {
  return new Promise((resolve, reject) => {
    accountApi.addStudy(studyData)
      .then(res => resolve(res))
      .catch(error => reject(error));
  });
};

exports.getStudyHistory = (studyData) => {
  return new Promise((resolve, reject) => {
    accountApi.getStudyHistory(studyData)
      .then(res => {
        const studyHistory = res.records.map(record => {
          const study = record.get('study');
          const school = record.get('school');
          const ret = {
            study: study.properties,
            school: Object.assign({ id: school.identity.low }, school.properties)
          };
          return ret;
        });
        resolve(studyHistory);
      })
      .catch(error => reject(error));
  });
};