function validateProps(props) {
  if (!props) {
    throw new Error('Too few arguments specified for processProps');
  }

  if (typeof props !== 'object') {
    throw new Error('Invalid type specified for props in validateProps');
  }

  const types = {
    INT: 'INT',
    VARCHAR255: 'VARCHAR(255)',
  };

  const commands = {
    CREATE: 'CREATE',
    TABLE: 'TABLE',
    INSERT: 'INSERT',
    INTO: 'INTO',
  };

  const propertyValues = Object.values(props);
  const typeValues = Object.values(types);

  for (let i = 0; i < propertyValues.length; i++) {
    let ctr = 0;

    for (let j = 0; j < typeValues.length; j++) {
      if (propertyValues[i].includes(typeValues[j])) {
        ctr = ctr + 1;
      }
    }

    if (!ctr) {
      throw new Error(
        'Invalid type specified on property: ' + propertyValues[i]
      );
    }
  }
}

module.exports = validateProps;
