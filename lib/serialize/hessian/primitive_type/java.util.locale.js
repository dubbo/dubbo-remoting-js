/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

module.exports = (gen, classInfo, version) => {
  gen('if (obj == null) { return encoder.writeNull(); }');
  gen('if (encoder._checkRef(obj)) { return; }');

  gen('if (typeof obj === \'object\') {');
  gen('  obj = obj.value');
  gen('}');

  if (version === '1.0') {
    gen('encoder.byteBuffer.put(0x4d);');
    gen('encoder.writeType(\'com.caucho.hessian.io.LocaleHandle\');');
    gen('encoder.writeString(\'value\');');
    gen('encoder.writeString(obj);');
    gen('encoder.byteBuffer.put(0x7a);');
  } else {
    gen('const ref = encoder._writeObjectBegin(\'com.caucho.hessian.io.LocaleHandle\');');
    gen('if (ref === -1) {');
    gen('encoder.writeInt(1);');
    gen('encoder.writeString(\'value\');');
    gen('encoder._writeObjectBegin(\'com.caucho.hessian.io.LocaleHandle\'); }');
    gen('encoder.writeString(obj);');
  }
};
