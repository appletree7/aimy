/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace IbsysPlanspielApp.ImportEntities {
    
    public class KeyData {
	  [XmlAttribute]
	  public string CurrentString { get; set; }
    }
}
