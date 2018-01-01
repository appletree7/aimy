/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace IbsysPlanspielApp.ImportEntities {
    public static class PeriodResultImporter {
	  public static PeriodResult ImportFromFile (string filePath) {
		XmlSerializer ser = new XmlSerializer(typeof(PeriodResult));
		StreamReader sr = new StreamReader(filePath);
		PeriodResult periodResults = (PeriodResult)ser.Deserialize(sr);
		sr.Close();

		periodResults.StockValue = Convert.ToDouble(GetCurrentValueFromKeyData(periodResults.KeyData, "StockValue"));
		periodResults.OrderCost = Convert.ToDouble(GetCurrentValueFromKeyData(periodResults.KeyData, "OrderCost"));
		periodResults.StorageCost = Convert.ToDouble(GetCurrentValueFromKeyData(periodResults.KeyData, "StorageCost"));
		periodResults.Summary = Convert.ToDouble(GetCurrentValueFromKeyData(periodResults.KeyData, "Summary"));
		periodResults.Effectivity = Convert.ToDouble(GetCurrentValueFromKeyData(periodResults.KeyData, "Effectivity")) / 100;
		return periodResults;
	  }

	  public static string GetCurrentValueFromKeyData (List<XmlElement> list, string name) {
		return list[0].GetElementsByTagName(name)[0].Attributes.GetNamedItem("Current").Value.Trim('%').Trim();
	  }

    }
}
